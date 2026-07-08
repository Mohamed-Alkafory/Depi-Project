// // // src/App.jsx
// // import { BrowserRouter } from "react-router-dom";
// // import { QueryClientProvider } from "@tanstack/react-query";
// // import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// // import { Toaster } from "sonner";
// // import { useEffect } from "react";

// // import { queryClient } from "./lib/queryClient";
// // import { AppRouter } from "./router/AppRouter";
// // import { useAuthStore } from "./features/auth/store/authStore";
// // import { supabase } from "./lib/supabase";

// // function App() {
// //   const initAuth = useAuthStore((s) => s.initAuth);

// //   // Initialize auth once on app start
// //   useEffect(() => {
// //     initAuth();
// //   }, [initAuth]);

// //   // ✅ Global auth listener - شغال طول الوقت
// //   useEffect(() => {
// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((event, session) => {
// //       console.log("🔐 Auth event:", event, "User:", session?.user?.email);

// //       useAuthStore.setState({
// //         user: session?.user ?? null,
// //         session: session ?? null,
// //         isAuthenticated: !!session?.user,
// //         loading: false,
// //       });
// //     });

// //     return () => subscription.unsubscribe();
// //   }, []);

// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <ReactQueryDevtools initialIsOpen={false} />

// //       <BrowserRouter>
// //         <AppRouter />
// //       </BrowserRouter>

// //       <Toaster richColors position="top-center" />
// //     </QueryClientProvider>
// //   );
// // }

// // export default App;
// // src/App.jsx
// import { BrowserRouter } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Toaster } from "sonner";
// import { useEffect } from "react";

// import { queryClient } from "./lib/queryClient";
// import { AppRouter } from "./router/AppRouter";
// import { useAuthStore } from "./features/auth/store/authStore";
// import { supabase } from "./lib/supabase";

// function App() {
//   const initialize = useAuthStore((s) => s.initialize);
//   const fetchProfile = useAuthStore((s) => s.fetchProfile);

//   // Initialize auth once on app start
//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // ✅ Global auth listener - شغال طول الوقت
//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       console.log("🔐 Auth event:", event, "User:", session?.user?.email);

//       const user = session?.user ?? null;

//       useAuthStore.setState({
//         user: user,
//         isAuthenticated: !!user,
//         loading: false,
//       });

//       // Fetch profile on sign in
//       if (event === "SIGNED_IN" && user) {
//         await fetchProfile(user.id);
//       }

//       // Clear on sign out
//       if (event === "SIGNED_OUT") {
//         useAuthStore.getState().clearAuth();
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [fetchProfile]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />

//       <BrowserRouter>
//         <AppRouter />
//       </BrowserRouter>

//       <Toaster richColors position="top-center" />
//     </QueryClientProvider>
//   );
// }

// export default App;
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
      console.log("🔐 Auth event:", event, "User:", session?.user?.email);

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
