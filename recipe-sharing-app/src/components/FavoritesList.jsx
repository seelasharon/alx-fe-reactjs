import React from "react";
import useRecipeStore from "../store/recipeStore";

const FavoritesList = () => {
  // Map favorite IDs to full recipe objects
  const favorites = useRecipeStore((state) =>
    state.favorites
      .map((id) => state.recipes.find((recipe) => recipe.id === id))
      .filter(Boolean) // remove deleted recipes
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "1rem" }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
