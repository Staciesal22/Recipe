document.getElementById('search-button').addEventListener('click', searchRecipes);

const APP_ID = 'd394924b';
const APP_KEY = 'eb4e1d47a16aa922d64d00587b233729';

async function searchRecipes() {
  const query = document.getElementById('search-input').value;
  if (query.trim() === '') return;

  const cuisineType = 'Chinese' ; 
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${cuisineType}`);
  const data = await response.json();
  displayRecipes(data.hits.map(hit => hit.recipe));
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.className = 'recipe';
    recipeElement.innerHTML = `
      <h2>${recipe.label}</h2>
      <img src="${recipe.image}" alt="${recipe.label}">
      <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    `;
    recipesContainer.appendChild(recipeElement);
  });
}
