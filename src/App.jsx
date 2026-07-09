// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useEffect } from "react";

import { queryClient } from "./lib/queryClient";
import { AppRouter } from "./router/AppRouter";
import { useAuthStore } from "./features/auth/store/authStore";
import { supabase } from "./lib/supabase";

function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const fetchProfile = useAuthStore((s) => s.fetchProfile);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;

      useAuthStore.setState({
        user: user,
        isAuthenticated: !!user,
        loading: false,
      });

      if (event === "SIGNED_IN" && user) {
        await fetchProfile(user.id);
      }

      if (event === "SIGNED_OUT") {
        useAuthStore.getState().clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
