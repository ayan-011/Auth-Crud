import { create } from 'zustand';
import axios from 'axios';

export const useCrudStore = create((set) => ({
  items: [],
  error: null,

  fetchItems: async () => {
    try {
      const res = await axios.get('/api/crud', { withCredentials: true });
      set({ items: res.data.items });
    } catch (err) {
      set({ error: err.message });
    }
  },

  createItem: async (data) => {
    try {
      const res = await axios.post('/api/crud', data, { withCredentials: true });
      set((state) => ({
        items: [...state.items, res.data.item]
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteItem: async (id) =>{
    const res = await fetch(`/api/crud/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    const data = await res.json()
    if(!data.success) return {success: false, message:data.message}

    set((state)=> ({ items: state.items.filter((item) => item._id !== id)}))
    return {success: true, message: data.message }
  },

}));
