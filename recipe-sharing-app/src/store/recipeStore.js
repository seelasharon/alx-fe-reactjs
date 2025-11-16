import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  // Data
  recipes: [],
  favorites: [],
  recommendations: [],

  // Filters / search
  searchTerm: "",
  ingredientFilter: "",
  timeFilter: "",

  // Results
  filteredRecipes: [],

  // CRUD actions
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)),
    })),

  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // Search & filtering
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIngredientFilter: (term) => set({ ingredientFilter: term }),
  setTimeFilter: (value) => set({ timeFilter: value }),
  filterRecipes: () =>
    set((state) => {
      const term = (state.searchTerm || "").toLowerCase().trim();
      const ingredientTerm = (state.ingredientFilter || "").toLowerCase().trim();
      const timeMax = state.timeFilter ? Number(state.timeFilter) : null;

      const filtered = state.recipes.filter((recipe) => {
        const matchesTitle = term.length === 0
          ? true
          : (recipe.title || "").toLowerCase().includes(term);

        let matchesIngredient = true;
        if (ingredientTerm.length > 0) {
          if (Array.isArray(recipe.ingredients)) {
            matchesIngredient = recipe.ingredients.some((ing) =>
              (ing || "").toLowerCase().includes(ingredientTerm)
            );
          } else {
            matchesIngredient = (recipe.ingredients || "")
              .toLowerCase()
              .includes(ingredientTerm);
          }
        }

        const matchesTime = timeMax == null
          ? true
          : (typeof recipe.cookTime === "number"
              ? recipe.cookTime <= timeMax
              : true);

        return matchesTitle && matchesIngredient && matchesTime;
      });

      return { filteredRecipes: filtered };
    }),

  // Favorites actions
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
