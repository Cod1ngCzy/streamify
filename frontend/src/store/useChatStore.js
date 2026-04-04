import { create } from "zustand";
import { StreamChat } from "stream-chat";
import { api } from "../lib/axios";
import toast from "react-hot-toast";


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useChatStore = create((set, get) => ({
  chatClient: null,
  isClientConnecting: false,
  channelList: [],
  isGettingChannelList: false,

  // This Function is For Stream Chat SDK
  initChat: async (user) => {
    if (!user?._id || !STREAM_API_KEY) return;
    if (get().chatClient?.userID === user._id.toString()) return; // already connected

    set({ isClientConnecting: true, streamAPIerror: null });

    try {
     // fetch stream token
      const { data } = await api.get("/chat/token");

     // connect to client (steam-chat-api)
      const client = StreamChat.getInstance(STREAM_API_KEY);

      if (client.userID) await client.disconnectUser(); // clear stale connection

      console.log(client, user._id);

      await client.connectUser(
        {
          id: user._id.toString(),
          name: user.fullName ?? user.username ?? user._id.toString(),
          image: user.imageUrl ?? undefined,
        },
        data.token
      );


      set({ chatClient: client, isClientConnecting: false });
      toast.success("Connected to chat");
      return client;
    } catch (error) {
      console.error("Stream connection error:", error);
      toast.error("Failed to connect to chat");
      set({ isClientConnecting: false });
    } finally {
      set({isClientConnecting: false});
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