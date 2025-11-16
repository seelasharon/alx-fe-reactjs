import React from "react";
import useRecipeStore from "../store/recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="🔍 Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: "12px",
        width: "100%",
        maxWidth: "500px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        marginBottom: "1.5rem",
        display: "block",
      }}
    />
  );
};

export default SearchBar;
