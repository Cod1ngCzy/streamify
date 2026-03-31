import {create} from "zustand";
import {api} from "../lib/axios.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://192.168.5.137:5001/api/v1" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try{
            const res = await api.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.error("Auth check failed", error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    // Login In State
    signIn: async (formData) => {
        set({isLoggingIn: true});
        try{
            const res = await api.post("/auth/sign-in", formData);

            const userData = res.data.userData;
            set({authUser: userData});
        } catch (error){
            console.log("Error", error);
        } finally {
            set({isLoggingIn: false});
        }
    },

    signUp: async (formData) => {
        set({isSigningUp: true});
        try{
            const res = await api.post("/auth/sign-up", formData);
            set({authUser: res.data.userData});
        } catch (error) {
            console.log("Error", error);
        } finally {
            set({isSigningUp: false});
        }
    },

    signOut: async () => {
        try{
            await api.post("/auth/sign-out");
            set({authUser: null});
        } catch (error){
            console.log(error.response.data.message);
        }
    },
}));
