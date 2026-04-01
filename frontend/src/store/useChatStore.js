import { create } from "zustand";
import { StreamChat } from "stream-chat";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useChatStore = create((set, get) => ({
  chatClient: null,
  isConnecting: false,
  error: null,

  connectUser: async ({ user, token }) => {
    if (!user?._id || !token || !STREAM_API_KEY) {
      console.log(STREAM_API_KEY);
      return
    };

    const existingClient = get().chatClient;
    if (existingClient?.userID === user._id) return; // prevent duplicate connections

    set({ isConnecting: true });

    try {
      // Disconnect any stale client first
      if (existingClient) {
        await existingClient.disconnectUser();
      }

      const client = StreamChat.getInstance(STREAM_API_KEY);

      // If getInstance returned an already-connected client, disconnect first
      if (client.userID && client.userID !== user._id) {
        await client.disconnectUser();
      }

      await client.connectUser(
        {
          id: user._id,
          name:
            user.fullName ??
            user.username ??
            user.primaryEmailAddress?.emailAddress ??
            user.id,
          image: user.imageUrl ?? undefined,
        },
        token
      );

      set({ chatClient: client, isConnecting: false });
      toast.success("Stream connection success");
    } catch (error) {
      console.error("Stream connection error:", error);
      toast.error("Connecting user to stream failed");
      Sentry.captureException(error, {
        tags: { component: "chatStore" },
      });

      set({ error, isConnecting: false });
    }
  },

  disconnectUser: async () => {
    const client = get().chatClient;
    if (client) {
      await client.disconnectUser();
      set({ chatClient: null });
    }
  },
}));