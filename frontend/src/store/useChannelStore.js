import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const useChannelStore = create((set,get) => ({
  channelList: [],
  isGettingChannelList: false,
  isCreatingChannel: false,
  
  getSubscribedChannels: async () => {
    set({isGettingChannelList: true});
    try {
      const { data } = await api.get("/channel/channels"); // backend endpoint
      set({channelList: data}); // store in state
    } catch (error) {
      toast.error("Error Getting Channel Lists");
    } finally{
      set({isGettingChannelList: false});
    }
  },

  createChannel: async (formData) => {
    set({isCreatingChannel: true});
    try{
      const res = await api.post("/channel/create", formData);
      toast.success("Channel created");
    } catch (error){
        toast.error("Error creating channel");
    } finally{
        set({isCreatingChannel: false});
    }
  }

}));