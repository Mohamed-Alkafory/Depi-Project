// // src/features/profile/components/ProfileForm.jsx
// import { useState, useRef } from "react";
// import { useProfile } from "../hooks/useProfile";
// import { Camera, Loader2, Save, User } from "lucide-react";

// export default function ProfileForm() {
//   const { profile, isLoading, updateProfile, uploadAvatar, isUpdating } =
//     useProfile();
//   const [formData, setFormData] = useState({
//     full_name: profile?.full_name || "",
//     phone: profile?.phone || "",
//     bio: profile?.bio || "",
//   });
//   const fileInputRef = useRef(null);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <Loader2 className="size-8 animate-spin text-teal-600" />
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateProfile(formData);
//   };

//   const handleAvatarClick = () => fileInputRef.current?.click();

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) uploadAvatar({ file, userId: profile.id });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Avatar */}
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative">
//           {profile?.avatar_url ? (
//             <img
//               src={profile.avatar_url}
//               alt="Avatar"
//               className="size-24 rounded-full object-cover border-4 border-teal-100"
//             />
//           ) : (
//             <div className="size-24 rounded-full bg-teal-100 flex items-center justify-center border-4 border-teal-200">
//               <User size={40} className="text-teal-600" />
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={handleAvatarClick}
//             className="absolute bottom-0 right-0 size-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
//           >
//             <Camera size={14} />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>
//         <p className="text-sm text-gray-500">Click to change photo</p>
//       </div>

//       {/* Fields */}
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
//             placeholder="Your name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             value={profile?.email || ""}
//             disabled
//             className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
//             placeholder="Your phone number"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Bio
//           </label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             rows={4}
//             className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none"
//             placeholder="Tell us about yourself..."
//           />
//         </div>
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         disabled={isUpdating}
//         className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors"
//       >
//         {isUpdating ? (
//           <Loader2 size={18} className="animate-spin" />
//         ) : (
//           <Save size={18} />
//         )}
//         {isUpdating ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// }
// src/features/profile/components/ProfileForm.jsx
import { useState, useRef, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { Camera, Loader2, Save, User } from "lucide-react";

export default function ProfileForm() {
  const { profile, isLoading, updateProfile, uploadAvatar, isUpdating } =
    useProfile();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    bio: "",
  });
  const fileInputRef = useRef(null);

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-teal-600" />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && profile?.id) uploadAvatar({ file, userId: profile.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="size-24 rounded-full object-cover border-4 border-teal-100"
            />
          ) : (
            <div className="size-24 rounded-full bg-teal-100 flex items-center justify-center border-4 border-teal-200">
              <User size={40} className="text-teal-600" />
            </div>
          )}
          <button
            type="button"
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 size-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
          >
            <Camera size={14} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-sm text-gray-500">Click to change photo</p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profile?.email || ""}
            disabled
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isUpdating}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors"
      >
        {isUpdating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        {isUpdating ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
