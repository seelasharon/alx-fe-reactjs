import { useRecipeStore } from "../store/recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate("/"); // Redirect to home after delete
  };

  return (
    <button onClick={handleDelete} style={{ marginTop: "1rem", color: "red" }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
