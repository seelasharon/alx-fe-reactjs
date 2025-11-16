import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  // Data
  recipes: [],

  // Filters / search
  searchTerm: "",
  ingredientFilter: "",
  timeFilter: "", // store as number or empty string

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

  // Setters for filters / search
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIngredientFilter: (term) => set({ ingredientFilter: term }),
  setTimeFilter: (value) => set({ timeFilter: value }),

  // Filtering logic — updates filteredRecipes based on current state
  filterRecipes: () =>
    set((state) => {
      const term = (state.searchTerm || "").toLowerCase().trim();
      const ingredientTerm = (state.ingredientFilter || "").toLowerCase().trim();
      const timeMax = state.timeFilter ? Number(state.timeFilter) : null;

      const filtered = state.recipes.filter((recipe) => {
        // Title / searchTerm match
        const matchesTitle = term.length === 0
          ? true
          : (recipe.title || "").toLowerCase().includes(term);

        // Ingredient match — recipe.ingredients may be a string or array
        let matchesIngredient = true;
        if (ingredientTerm.length > 0) {
          if (Array.isArray(recipe.ingredients)) {
            matchesIngredient = recipe.ingredients.some((ing) =>
              (ing || "").toLowerCase().includes(ingredientTerm)
            );
          } else {
            // treat ingredients as string
            matchesIngredient = (recipe.ingredients || "")
              .toLowerCase()
              .includes(ingredientTerm);
          }
        }

        // Time match — assume recipe.cookTime (minutes) exists if present
        const matchesTime = timeMax == null
          ? true
          : (typeof recipe.cookTime === "number"
              ? recipe.cookTime <= timeMax
              : true); // if recipe has no cookTime, include it

        return matchesTitle && matchesIngredient && matchesTime;
      });

      return { filteredRecipes: filtered };
    }),
}));

export default useRecipeStore;
