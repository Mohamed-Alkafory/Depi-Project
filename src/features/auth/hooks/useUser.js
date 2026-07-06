// // // src/features/auth/hooks/useUser.js
// // import { useQuery } from "@tanstack/react-query";
// // import { supabase } from "@/lib/supabase";
// // import { useAuthStore } from "@/features/auth/store/authStore"; // ← أضف ده!

// // export function useUser() {
// //   const user = useAuthStore((s) => s.user);

// //   return useQuery({
// //     queryKey: ["user", user?.id],
// //     queryFn: async () => {
// //       if (!user?.id) return null;
// //       const { data, error } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .eq("id", user.id)
// //         .single();

// //       if (error) throw error;
// //       return data;
// //     },
// //     enabled: !!user?.id,
// //   });
// // }
// // src/features/auth/hooks/useUser.js
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";

// export function useUser() {
//   return useQuery({
//     queryKey: ["user"], // ← نفس الـ key اللي بنعمله invalidate
//     queryFn: async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return null;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       return { ...user, profile };
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// }
// src/features/auth/hooks/useUser.js
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";

// export function useUser() {
//   return useQuery({
//     queryKey: ["user"], // ← نفس الـ key
//     queryFn: async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return null;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       return { ...user, profile }; // ← بيرجع object فيه user + profile
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// }
// src/features/auth/hooks/useUser.js
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";

// export function useUser() {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) return null;

//       // ✅ نجيب الـ profile من الـ profiles table
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       return { ...user, profile }; // ← profile = profiles table row
//     },
//   });
// }

// src/features/auth/hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      // ✅ نجيب الـ profile من profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      return {
        ...user,
        profile,
        role: profile?.role || "user", // ← نضيف role من profiles
      };
    },
  });
}
