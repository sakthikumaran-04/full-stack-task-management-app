import { create } from "zustand";

type AuthState = {
  username: string;
  userId: string;
  isLoggedIn: boolean;
  login: (username: string, userId: string) => void;
  logout: () => void;
  setUsername: (username: string) => void;
  setUserId: (userId: string) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  username: localStorage.getItem('username') || "",
  userId: localStorage.getItem('userId') || "",
  isLoggedIn: localStorage.getItem('isLoggedIn')=="true" || false,
  login: (username, userId) => {
    if (!username || !userId) {
      console.error("Username and User ID are required");
      return;
    }
    set({ username, userId, isLoggedIn: true });
  },
  logout: () => set({ username: "", userId: "", isLoggedIn: false }),
  setUsername: (username) => set({ username }),
  setUserId: (userId) => set({ userId }),
}));

export  {useAuthStore};
