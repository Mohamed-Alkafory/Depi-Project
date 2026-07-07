// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, User } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileForm from "@/features/profile/components/ProfileForm";

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} className="text-teal-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.full_name || "My Profile"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <ProfileForm />
        </div>

        {/* Role Badge */}
        {profile?.role === "admin" && (
          <div className="mt-6 flex items-center gap-2 px-4 py-3 bg-purple-50 border border-purple-100 rounded-xl">
            <Shield size={18} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-700">
              Admin Account
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
