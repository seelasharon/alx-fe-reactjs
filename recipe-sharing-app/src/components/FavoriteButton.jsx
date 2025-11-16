import React from "react";
import useRecipeStore from "../store/recipeStore";

const FavoriteButton = ({ recipeId }) => {
  // Access favorites and actions from store
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite(recipeId); // Unmark favorite
    } else {
      addFavorite(recipeId);    // Mark as favorite
    }
  };

  return (
    <button onClick={handleClick} style={{ marginLeft: "1rem" }}>
      {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
