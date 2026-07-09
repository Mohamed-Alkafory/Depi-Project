// src/pages/Favorites.jsx
import { useNavigate } from "react-router-dom";
import { useFavoritesQuery } from "@/features/favorites/hooks/useFavorites";
import HousePlanCard from "@/components/houses/HousePlanCard";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react"; // or any icon you have
import favBackground from "@/assets/images/favBackground.png";

export function Favorites() {
  const navigate = useNavigate();
  const { data: favorites, isLoading } = useFavoritesQuery();

  // ✅ Loading state with spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const favoritePlans = (favorites || [])
    .filter((f) => f.plans?.status !== "sold_out")
    .map((f) => f.plans)
    .filter(Boolean); // ✅ remove any null/undefined

  // ✅ Empty state (after loading finishes)
  if (favoritePlans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your favorites are empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any favorites yet.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8    py-3 rounded-xl font-medium transition-colors mt-5"
          >
            Browse Plans
          </button>
        </div>
      </div>
    );
  }

  // ✅ Has favorites
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:pt-6 lg:pt-8">
        <div
          className="relative flex h-[240px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl sm:h-[280px] sm:rounded-3xl lg:h-[320px]"
          style={{
            backgroundImage:{favBackground},
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center px-6 sm:px-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[36px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[64px]"
            >
              Favorites
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-4 text-center text-[16px] font-normal text-white/90 sm:mt-6 sm:text-lg lg:text-[22px]"
            >
              Your saved house plans, all in one place
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              whileHover={{ y: -2, scale: 1.03 }}
              onClick={() => navigate("/plans")}
              className="mt-6 flex h-12 w-fit items-center gap-2 rounded-[999px] bg-white px-6 font-medium text-[#0B7D7B] shadow-md transition-shadow duration-300 hover:shadow-xl sm:mt-8 sm:h-14 sm:px-8"
            >
              <Search size={18} />
              Browse More Plans
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritePlans.map((plan) => (
            <HousePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}