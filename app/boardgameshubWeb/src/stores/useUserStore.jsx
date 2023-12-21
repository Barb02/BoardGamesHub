import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      logged: false,
      role: null,

      login: (token, username, role) => {
        set(() => ({
          token: token,
          username: username,
          logged: true,
          role: role
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
