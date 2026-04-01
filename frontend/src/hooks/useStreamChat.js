import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { api } from "../lib/axios";

export const useStreamChat = () => {
  const { authUser } = useAuthStore();
  const { connectUser, disconnectUser, chatClient, isConnecting, error: storeError } = useChatStore();

  const { data: tokenData, isLoading, error: queryError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: async () => {
      const response = await api.get("/chat/token");
      return response.data;
    },
    enabled: !!authUser?._id,
    // Prevent refetching on window focus from triggering reconnects
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // treat token as fresh for 5 minutes
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser) {
      return;
    };

    connectUser({ user: authUser, token: tokenData.token });

    // Only disconnect when the user actually logs out (authUser becomes null),
    // not on every dep change — so we handle cleanup at the auth level instead
    return () => {
      // intentionally empty; disconnectUser is called from signOut in useAuthStore
    };
  }, [tokenData?.token, authUser?._id]);

  return {
    chatClient,
    isConnecting,
    isLoading,
    error: storeError ?? queryError,
  };
};