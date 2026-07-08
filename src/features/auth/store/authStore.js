// // // import { create } from "zustand";
// // // import { supabase } from "@/lib/supabase";

// // // let authSubscription = null;

// // // export const useAuthStore = create((set, get) => ({
// // //   user: null,
// // //   session: null,
// // //   loading: true,
// // //   isAuthenticated: false,
// // //   initialized: false,

// // //   setUser: (user) => set({ user, isAuthenticated: !!user }),
// // //   setLoading: (loading) => set({ loading }),

// // //   initAuth: async () => {
// // //     if (get().initialized) return;

// // //     set({ loading: true, initialized: true });

// // //     try {
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();
// // //       set({
// // //         user: session?.user ?? null,
// // //         session: session ?? null,
// // //         isAuthenticated: !!session?.user,
// // //         loading: false,
// // //       });

// // //       authSubscription?.unsubscribe();
// // //       const { data } = supabase.auth.onAuthStateChange((_event, session) => {
// // //         set({
// // //           user: session?.user ?? null,
// // //           session: session ?? null,
// // //           isAuthenticated: !!session?.user,
// // //         });
// // //       });
// // //       authSubscription = data.subscription;
// // //     } catch (err) {
// // //       set({ loading: false });
// // //       console.error("Auth init error:", err);
// // //     }
// // //   },

// // //   clearAuth: () => {
// // //     authSubscription?.unsubscribe();
// // //     authSubscription = null;
// // //     set({
// // //       user: null,
// // //       session: null,
// // //       isAuthenticated: false,
// // //       loading: false,
// // //       initialized: false,
// // //     });
// // //   },
// // // }));
// // // src/features/auth/store/authStore.js
// // import { create } from "zustand";
// // import { supabase } from "@/lib/supabase";

// // export const useAuthStore = create((set, get) => ({
// //   user: null,
// //   profile: null,
// //   isAdmin: false,
// //   isAuthenticated: false,
// //   loading: true,

// //   setUser: (user) => set({ user, isAuthenticated: !!user }),

// //   setProfile: (profile) =>
// //     set({
// //       profile,
// //       isAdmin: profile?.role === "admin",
// //     }),

// //   clearAuth: () =>
// //     set({
// //       user: null,
// //       profile: null,
// //       isAdmin: false,
// //       isAuthenticated: false,
// //       loading: false,
// //     }),

// //   fetchProfile: async (userId) => {
// //     if (!userId) return;

// //     const { data, error } = await supabase
// //       .from("profiles")
// //       .select("*")
// //       .eq("id", userId)
// //       .single();

// //     if (error) {
// //       console.error("fetchProfile error:", error);
// //       return;
// //     }

// //     set({
// //       profile: data,
// //       isAdmin: data?.role === "admin",
// //     });
// //   },

// //   initialize: async () => {
// //     set({ loading: true });

// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       const user = session?.user || null;

// //       set({ user, isAuthenticated: !!user });

// //       if (user) {
// //         await get().fetchProfile(user.id);
// //       }
// //     } catch (error) {
// //       console.error("Auth init error:", error);
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   signIn: async (email, password) => {
// //     set({ loading: true });

// //     try {
// //       const { data, error } = await supabase.auth.signInWithPassword({
// //         email,
// //         password,
// //       });

// //       if (error) throw error;

// //       set({ user: data.user, isAuthenticated: true });
// //       await get().fetchProfile(data.user.id);

// //       return { success: true };
// //     } catch (error) {
// //       return { success: false, error: error.message };
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   signUp: async (email, password, userData) => {
// //     set({ loading: true });

// //     try {
// //       const { data, error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: { data: userData },
// //       });

// //       if (error) throw error;

// //       // Create profile with default role 'user'
// //       if (data.user) {
// //         const { error: profileError } = await supabase.from("profiles").insert({
// //           id: data.user.id,
// //           email: data.user.email,
// //           full_name: userData?.full_name || email,
// //           role: "user",
// //         });

// //         if (profileError)
// //           console.error("Profile creation error:", profileError);

// //         set({ user: data.user, isAuthenticated: true });
// //         await get().fetchProfile(data.user.id);
// //       }

// //       return { success: true };
// //     } catch (error) {
// //       return { success: false, error: error.message };
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   logout: async () => {
// //     await supabase.auth.signOut();
// //     get().clearAuth();
// //   },
// // }));
// // src/features/auth/store/authStore.js
// import { create } from "zustand";
// import { supabase } from "@/lib/supabase";

// export const useAuthStore = create((set, get) => ({
//   // Auth state
//   user: null,
//   profile: null,
//   isAdmin: false,
//   isAuthenticated: false,
//   loading: true,

//   // Modal state (merged from authModalStore)
//   isModalOpen: false,
//   modalMode: "signin", // "signin" | "signup"
//   redirectTo: null,

//   setUser: (user) => set({ user, isAuthenticated: !!user }),

//   setProfile: (profile) =>
//     set({
//       profile,
//       isAdmin: profile?.role === "admin",
//     }),

//   clearAuth: () =>
//     set({
//       user: null,
//       profile: null,
//       isAdmin: false,
//       isAuthenticated: false,
//       loading: false,
//     }),

//   // Modal actions
//   openModal: (mode = "signin", redirectTo = null) =>
//     set({ isModalOpen: true, modalMode: mode, redirectTo }),

//   closeModal: () => set({ isModalOpen: false, redirectTo: null }),

//   setModalMode: (mode) => set({ modalMode: mode }),

//   fetchProfile: async (userId) => {
//     if (!userId) return;

//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("fetchProfile error:", error);
//       return;
//     }

//     set({
//       profile: data,
//       isAdmin: data?.role === "admin",
//     });
//   },

//   initialize: async () => {
//     set({ loading: true });

//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       const user = session?.user || null;

//       set({ user, isAuthenticated: !!user });

//       if (user) {
//         await get().fetchProfile(user.id);
//       }
//     } catch (error) {
//       console.error("Auth init error:", error);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   signIn: async (email, password) => {
//     set({ loading: true });

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       set({ user: data.user, isAuthenticated: true });
//       await get().fetchProfile(data.user.id);

//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     } finally {
//       set({ loading: false });
//     }
//   },

//   signUp: async (email, password, userData) => {
//     set({ loading: true });

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: userData },
//       });

//       if (error) throw error;

//       // Create profile with default role 'user'
//       if (data.user) {
//         const { error: profileError } = await supabase.from("profiles").insert({
//           id: data.user.id,
//           email: data.user.email,
//           full_name: userData?.full_name || email,
//           role: "user",
//         });

//         if (profileError)
//           console.error("Profile creation error:", profileError);

//         set({ user: data.user, isAuthenticated: true });
//         await get().fetchProfile(data.user.id);
//       }

//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     } finally {
//       set({ loading: false });
//     }
//   },

//   logout: async () => {
//     await supabase.auth.signOut();
//     get().clearAuth();
//   },
// }));
// src/features/auth/store/authStore.js
import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useAuthStore = create((set, get) => ({
  // Auth state
  user: null,
  profile: null,
  isAdmin: false,
  isAuthenticated: false,
  loading: true,

  // Modal state
  isModalOpen: false,
  modalMode: "signin",
  redirectTo: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setProfile: (profile) =>
    set({
      profile,
      isAdmin: profile?.role === "admin",
    }),

  clearAuth: () =>
    set({
      user: null,
      profile: null,
      isAdmin: false,
      isAuthenticated: false,
      loading: false,
    }),

  // Modal actions
  openModal: (mode = "signin", redirectTo = null) =>
    set({ isModalOpen: true, modalMode: mode, redirectTo }),

  closeModal: () => set({ isModalOpen: false, redirectTo: null }),

  setModalMode: (mode) => set({ modalMode: mode }),

  fetchProfile: async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("fetchProfile error:", error);
      return;
    }

    set({
      profile: data,
      isAdmin: data?.role === "admin",
    });
  },

  initialize: async () => {
    set({ loading: true });

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user || null;

      set({ user, isAuthenticated: !!user });

      if (user) {
        await get().fetchProfile(user.id);
      }
    } catch (error) {
      console.error("Auth init error:", error);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ user: data.user, isAuthenticated: true });
      await get().fetchProfile(data.user.id);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password, userData) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData },
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          full_name: userData?.full_name || email,
          role: "user",
        });

        if (profileError)
          console.error("Profile creation error:", profileError);

        set({ user: data.user, isAuthenticated: true });
        await get().fetchProfile(data.user.id);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    get().clearAuth();
  },
}));
