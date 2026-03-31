
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { api } from "../lib/axios";

export const useStreamChat = () => {
  const { authUser } = useAuthStore();
  const { connectUser, disconnectUser, chatClient } = useChatStore();

  const { data: tokenData, isLoading, error } = useQuery({
    queryKey: ["streamToken"],
    queryFn: async () => {
        const response = await api.get("/chat/token");
        return response.data;
    },
    enabled: !!authUser?.id,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser) return;

    connectUser({ authUser, token: tokenData.token });

    return () => {
      disconnectUser();
    };
  }, [tokenData?.token, authUser?.id]);

  return { chatClient, isLoading, error };
};