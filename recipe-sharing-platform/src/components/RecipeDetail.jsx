import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipesData from '../data.json';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const foundRecipe = recipesData.find(r => r.id === parseInt(id));
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading recipe:', error);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-600 mb-4">Recipe not found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
        >
          <span className="text-2xl mr-2">←</span>
          Back to Recipes
        </button>

        {/* Recipe Header */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          {/* Recipe Image */}
          <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Recipe Title and Meta */}
          <div className="p-8 bg-white">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {recipe.summary}
            </p>

            {/* Recipe Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-b border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold mb-2">Prep Time</p>
                <p className="text-2xl font-bold text-indigo-600">{recipe.prepTime}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold mb-2">Cook Time</p>
                <p className="text-2xl font-bold text-indigo-600">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold mb-2">Servings</p>
                <p className="text-2xl font-bold text-indigo-600">{recipe.servings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📋</span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-700"
                  >
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-base">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">👨‍🍳</span>
                Cooking Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-4 pt-1">
                      <p className="text-gray-700 text-base leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mt-8">
              <div className="flex">
                <div className="flex-shrink-0 text-blue-600 text-2xl">💡</div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Chef's Tips</h3>
                  <p className="text-blue-800">
                    For best results, use fresh, high-quality ingredients. Don't rush the cooking process, and taste as you go to adjust seasonings to your preference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Back to Home
          </button>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
          >
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
