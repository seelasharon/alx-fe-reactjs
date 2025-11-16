import { useEffect } from "react";
import useRecipeStore from "../store/recipeStore";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Trigger filtering whenever searchTerm changes
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  // Decide which list to show
  const listToShow =
    searchTerm.trim().length > 0 ? filteredRecipes : recipes;

  return (
    <div>
      <SearchBar />

      {listToShow.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        listToShow.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
              border: "1px solid #eee",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none" }}>
              <h3 style={{ margin: 0 }}>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>

            {/* Favorite button */}
            <FavoriteButton recipeId={recipe.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
