import { create } from "zustand";
import { supabase } from "@/lib/supabase";

let authSubscription = null;

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  initialized: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),

  initAuth: async () => {
    if (get().initialized) return;

    set({ loading: true, initialized: true });

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({
        user: session?.user ?? null,
        session: session ?? null,
        isAuthenticated: !!session?.user,
        loading: false,
      });

      authSubscription?.unsubscribe();
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session: session ?? null,
          isAuthenticated: !!session?.user,
        });
      });
      authSubscription = data.subscription;
    } catch (err) {
      set({ loading: false });
      console.error("Auth init error:", err);
    }
  },

  clearAuth: () => {
    authSubscription?.unsubscribe();
    authSubscription = null;
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      loading: false,
      initialized: false,
    });
  },
}));
