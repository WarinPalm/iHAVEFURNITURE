import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const ecomStore = (set) => ({
    user: null,
    token: null,
    
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:3000/api/login', form);
        set({ user: res.data.payload, token: res.data.token});
        return res;
    },

    actionLogout: () => {
        set({ user: '', token: ''});
        localStorage.removeItem('ecom-store'); 
    }
});

const usePersist = {
    name: 'ecom-store',
    Storage: createJSONStorage(() => localStorage)
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
