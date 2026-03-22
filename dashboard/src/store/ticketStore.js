import { create } from "zustand";

const useTicketStore = create((set) => ({
  tickets: [],
  selectedTicket: null,
  stats: null,

  setTickets: (tickets) => set({ tickets }),
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  setStats: (stats) => set({ stats }),
}));

export default useTicketStore;