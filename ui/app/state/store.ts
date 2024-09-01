import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  userData: {
    username: string;
    email: string;
    // Add other user properties as needed
  } | null;
  login: (userData: UserState['userData']) => void;
  logout: () => void;
}

const useStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userData: null,
      login: (userData) => set({ isLoggedIn: true, userData }),
      logout: () => set({ isLoggedIn: false, userData: null }),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;