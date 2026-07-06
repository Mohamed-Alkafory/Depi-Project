// src/pages/TestAuthPage.jsx
import { useState } from "react";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useUser } from "@/features/auth/hooks/useUser";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function TestAuthPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("signin");

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);

  const { data: profile, isLoading: profileLoading } = useUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  //   const openSignIn = () => {
  //     setModalMode("signin");
  //     setIsModalOpen(true);
  //   };
  const openSignIn = () => {
    console.log("Opening Sign In modal"); // ← أضف ده
    setModalMode("signin");
    setIsModalOpen(true);
  };

  // ... في الـ return أضف:
  {
    isModalOpen && <p className="text-green-400">Modal should be open!</p>;
  }

  const openSignUp = () => {
    setModalMode("signup");
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">🔧 Auth Test</h1>

        {/* Auth Status */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-3">Session</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Authenticated:</span>
              <span
                className={
                  isAuthenticated
                    ? "text-green-400 font-medium"
                    : "text-red-400 font-medium"
                }
              >
                {isAuthenticated ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            {user && (
              <>
                <div className="flex justify-between">
                  <span className="text-white/50">Email:</span>
                  <span className="text-white/80">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">User ID:</span>
                  <span className="text-white/80 font-mono text-xs">
                    {user.id?.slice(0, 12)}...
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Profile from DB */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-3">
            Profile (from DB)
          </h2>
          {profileLoading ? (
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <div className="w-4 h-4 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
              Loading profile...
            </div>
          ) : profile ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Name:</span>
                <span className="text-white/80">
                  {profile.full_name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Role:</span>
                <span
                  className={
                    profile.role === "admin"
                      ? "text-purple-400 font-bold"
                      : "text-cyan-400"
                  }
                >
                  {profile.role || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Phone:</span>
                <span className="text-white/80">{profile.phone || "N/A"}</span>
              </div>
            </div>
          ) : (
            <p className="text-white/50 text-sm">No profile loaded</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={openSignIn}
                className="flex-1 bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-white/90 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="w-full bg-red-500/20 text-red-300 font-semibold py-3 px-4 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultMode={modalMode}
      />
    </div>
  );
}
