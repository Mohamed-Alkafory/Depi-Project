// // src/pages/admin/AdminUsers.jsx
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import { Users, Search, Mail, Phone, Shield, User } from "lucide-react";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     async function fetchUsers() {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (!error) setUsers(data || []);
//       setLoading(false);
//     }
//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter(
//     (u) =>
//       u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase()) ||
//       u.phone?.includes(search),
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//           <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
//             <Users size={20} className="text-teal-600" />
//           </div>
//           Users Management
//         </h1>

//         {/* Search */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
//           <div className="relative">
//             <Search
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
//                   User
//                 </th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
//                   Contact
//                 </th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
//                   Role
//                 </th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
//                   Joined
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {filteredUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
//                         <User size={18} className="text-teal-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {user.full_name || "No Name"}
//                         </p>
//                         <p className="text-xs text-gray-500">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Phone size={14} />
//                         {user.phone || "N/A"}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
//                         user.role === "admin"
//                           ? "bg-purple-100 text-purple-700"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                     >
//                       {user.role === "admin" && <Shield size={12} />}
//                       {user.role || "user"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-sm text-gray-500">
//                       {new Date(user.created_at).toLocaleDateString("en-EG")}
//                     </p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredUsers.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No users found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/admin/AdminUsers.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Users, Search, User, Shield, Mail, Phone } from "lucide-react";

async function fetchUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-teal-600" />
          </div>
          Users Management
        </h1>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    User
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Contact
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Role
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.full_name || "No Name"}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          {user.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role === "admin" && <Shield size={12} />}
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString("en-EG")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: Cards */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {user.full_name || "No Name"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  {user.phone || "N/A"}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role === "admin" && <Shield size={12} />}
                    {user.role || "user"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(user.created_at).toLocaleDateString("en-EG")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
