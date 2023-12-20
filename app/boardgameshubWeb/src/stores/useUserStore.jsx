import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      logged: false,
      admin: false,

      login: (token, username, email) => {
        set(() => ({
          token: token,
          username: username,
          logged: true,
        }));
        console.log(email);
        if (email === "admin@gmail.com")
          set(() => ({
            admin: true,
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
