import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  // --- Data ---
  recipes: [],            // All recipes in the app
  favorites: [],          // Array of recipe IDs marked as favorites
  recommendations: [],    // Recipes recommended based on favorites

  // --- Filters / Search ---
  searchTerm: "",         // User search input for recipe titles
  ingredientFilter: "",   // Filter recipes by ingredients
  timeFilter: "",         // Filter recipes by max cook time (minutes)

  // --- Results ---
  filteredRecipes: [],    // Recipes after applying search/filter logic

  // --- CRUD actions ---
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)),
    })),

  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // --- Search & filtering ---
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIngredientFilter: (term) => set({ ingredientFilter: term }),
  setTimeFilter: (value) => set({ timeFilter: value }),

  // Apply filters and update filteredRecipes
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

  // --- Favorites actions ---
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId], // Avoid duplicates
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // --- Recommendations ---
  generateRecommendations: () =>
    set((state) => {
      // Simple mock: select some favorited recipes at random
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
