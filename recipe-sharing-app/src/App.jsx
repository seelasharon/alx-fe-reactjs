import React from "react";
import RecipeList from "./components/RecipeList";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Recipe Sharing App</h1>
      
      {/* Recipe list with favorite buttons */}
      <RecipeList />

      {/* Favorites list */}
      <FavoritesList />

      {/* Recommendations list */}
      <RecommendationsList />
    </div>
  );
}

export default App;
