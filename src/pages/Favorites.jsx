// src/pages/Favorites.jsx
import { useFavoritesQuery } from "@/features/favorites/hooks/useFavorites";
import HousePlanCard from "@/components/houses/HousePlanCard";

export function Favorites() {
  const { data: favorites, isLoading } = useFavoritesQuery();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-neutral-400">
        Loading favorites...
      </div>
    );
  }

  const favoritePlans = (favorites || [])
    .filter((f) => f.plans?.status !== "sold_out")
    .map((f) => f.plans);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favorites</h1>

      {favoritePlans.length === 0 ? (
        <p className="text-neutral-500">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritePlans.map((plan) => (
            <HousePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}
