import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes with explicit target.value
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Recipe image URL is required';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(ing => ing.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients';
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Cooking instructions are required';
    } else {
      const instructionsList = formData.instructions.split('\n').filter(inst => inst.trim());
      if (instructionsList.length < 2) {
        newErrors.instructions = 'Please add at least 2 cooking steps';
      }
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Prep time is required';
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cook time is required';
    }

    if (!formData.servings.trim()) {
      newErrors.servings = 'Servings is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      
      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <span className="text-2xl mr-2">←</span>
            Back to Home
          </button>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍽️ Add New Recipe
          </h1>
          <p className="text-xl text-gray-700">
            Share your favorite recipe with our community
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-center">
              <span className="text-3xl mr-4">✅</span>
              <div>
                <h3 className="text-lg font-bold text-green-900">Recipe Added Successfully!</h3>
                <p className="text-green-800">Redirecting you to the home page...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 md:p-12"
        >
          {/* Title Field */}
          <div className="mb-8">
            <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Homemade Chocolate Cake"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                errors.title
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.title && (
              <p className="mt-2 text-red-600 font-semibold flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Summary Field */}
          <div className="mb-8">
            <label htmlFor="summary" className="block text-lg font-semibold text-gray-900 mb-3">
              Recipe Summary *
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief description of your recipe..."
              rows="3"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${
                errors.summary
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.summary && (
              <p className="mt-2 text-red-600 font-semibold flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.summary}
              </p>
            )}
          </div>

          {/* Image URL Field */}
          <div className="mb-8">
            <label htmlFor="image" className="block text-lg font-semibold text-gray-900 mb-3">
              Recipe Image URL *
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/recipe-image.jpg"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                errors.image
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.image && (
              <p className="mt-2 text-red-600 font-semibold flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.image}
              </p>
            )}
          </div>

          {/* Ingredients Field */}
          <div className="mb-8">
            <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-900 mb-3">
              Ingredients (one per line, min. 2) *
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="1. First ingredient&#10;2. Second ingredient&#10;3. Third ingredient..."
              rows="6"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-mono text-sm ${
                errors.ingredients
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.ingredients && (
              <p className="mt-2 text-red-600 font-semibold flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.ingredients}
              </p>
            )}
            <p className="mt-2 text-gray-600 text-sm">
              📝 Tip: Enter each ingredient on a new line for clarity
            </p>
          </div>

          {/* Cooking Instructions Field */}
          <div className="mb-8">
            <label htmlFor="instructions" className="block text-lg font-semibold text-gray-900 mb-3">
              Cooking Instructions (one per line, min. 2) *
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="1. First step&#10;2. Second step&#10;3. Third step..."
              rows="8"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-mono text-sm ${
                errors.instructions
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.instructions && (
              <p className="mt-2 text-red-600 font-semibold flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.instructions}
              </p>
            )}
            <p className="mt-2 text-gray-600 text-sm">
              📝 Tip: Enter each instruction on a new line
            </p>
          </div>

          {/* Timing and Servings Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Prep Time */}
            <div>
              <label htmlFor="prepTime" className="block text-lg font-semibold text-gray-900 mb-3">
                Prep Time *
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 15 mins"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.prepTime
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.prepTime && (
                <p className="mt-2 text-red-600 font-semibold flex items-center text-sm">
                  <span className="mr-1">⚠️</span>
                  {errors.prepTime}
                </p>
              )}
            </div>

            {/* Cook Time */}
            <div>
              <label htmlFor="cookTime" className="block text-lg font-semibold text-gray-900 mb-3">
                Cook Time *
              </label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                placeholder="e.g., 30 mins"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.cookTime
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.cookTime && (
                <p className="mt-2 text-red-600 font-semibold flex items-center text-sm">
                  <span className="mr-1">⚠️</span>
                  {errors.cookTime}
                </p>
              )}
            </div>

            {/* Servings */}
            <div>
              <label htmlFor="servings" className="block text-lg font-semibold text-gray-900 mb-3">
                Servings *
              </label>
              <input
                type="text"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="e.g., 4"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.servings
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.servings && (
                <p className="mt-2 text-red-600 font-semibold flex items-center text-sm">
                  <span className="mr-1">⚠️</span>
                  {errors.servings}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              ✓ Add Recipe
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600 text-sm">
            * Required fields
          </p>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0 text-blue-600 text-2xl">ℹ️</div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Form Tips</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>✓ All fields are required to submit the form</li>
                <li>✓ Ingredients and instructions need at least 2 items each</li>
                <li>✓ Each ingredient and instruction should be on a separate line</li>
                <li>✓ Your recipe will be added to the platform once submitted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
