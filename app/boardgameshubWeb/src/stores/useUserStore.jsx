import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      logged: false,

      login: (token, username) => {
        set(() => ({
          token: token,
          username: username,
          logged: true,
        }));
      },

      logout: () => {
        set(() => ({
          token: null,
          username: null,
          logged: false,
        }));
      },
    }),
    {
      name: "token-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
