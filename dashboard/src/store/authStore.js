import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  agent: JSON.parse(localStorage.getItem("agent") || "null"),

  login: (token, agent) => {
    localStorage.setItem("token", token);
    localStorage.setItem("agent", JSON.stringify(agent));
    set({ token, agent });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("agent");
    set({ token: null, agent: null });
  },
}));

export default useAuthStore;