import { useState, useEffect } from 'react';
import recipesData from '../data.json';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from JSON file
    try {
      setRecipes(recipesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading recipes:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-xl text-gray-700">
            Discover and share delicious recipes from around the world
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform overflow-hidden cursor-pointer border border-gray-100"
            >
              {/* Recipe Image Container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {/* Image Overlay Badge */}
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Recipe #{recipe.id}
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3">
                  {recipe.summary}
                </p>

                {/* View Recipe Button */}
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-y-1 shadow-md">
                  View Full Recipe →
                </button>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recipe Card</span>
                <span className="text-indigo-600 text-lg">★★★★★</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
