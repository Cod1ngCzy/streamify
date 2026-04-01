import { create } from "zustand";
import { StreamChat } from "stream-chat";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useChatStore = create((set, get) => ({
  chatClient: null,
  isConnecting: false,
  error: null,

  initChat: async (user) => {
    if (!user?._id || !STREAM_API_KEY) return;
    if (get().chatClient?.userID === user._id.toString()) return; // already connected

    set({ isConnecting: true, error: null });

    try {
     // fetch stream token
      const { data } = await api.get("/chat/token");

     // connect to client (steam-chat-api)
      const client = StreamChat.getInstance(STREAM_API_KEY);

      if (client.userID) await client.disconnectUser(); // clear stale connection

      await client.connectUser(
        {
          id: user._id.toString(),
          name: user.fullName ?? user.username ?? user._id.toString(),
          image: user.imageUrl ?? undefined,
        },
        data.token
      );

      set({ chatClient: client, isConnecting: false });
      toast.success("Connected to chat");
    } catch (error) {
      console.error("Stream connection error:", error);
      toast.error("Failed to connect to chat");
      set({ error, isConnecting: false });
    }
  },

  disconnectChat: async () => {
    const client = get().chatClient;
    if (client) {
      await client.disconnectUser();
      set({ chatClient: null });
    }
  },
}));