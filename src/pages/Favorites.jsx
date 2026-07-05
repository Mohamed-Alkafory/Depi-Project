import housePlans from "@/assets/data/houses.json";
import { useFavorites } from "@/store/useFavorites";
import HousePlanCard from "@/components/houses/HousePlanCard";

export const Favorites = () => {
  const favoriteIds = useFavorites((s) => s.favoriteIds);
  const favorites = housePlans.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-neutral-500">No favorites yet. Browse plans and save your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((plan) => (
            <HousePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};
