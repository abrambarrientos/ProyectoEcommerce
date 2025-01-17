// fetchRecipes.js

const API_KEY = 'fc0058ed0dec446a9efc204019bab581'; // Reemplaza con tu clave de Spoonacular
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.results) {
      renderRecipes(data.results);
    } else {
      console.error('No se encontraron recetas:', data);
    }
  } catch (error) {
    console.error('Error al obtener las recetas:', error);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById('CONTENEDOR');

  if (!container) {
    console.error('No se encontró el contenedor con id "CONTENEDOR".');
    return;
  }

  // Limpiar el contenedor antes de renderizar
  container.innerHTML = '';

  // Crear elementos para cada receta
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card bg-white rounded-md shadow-md p-4';

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-40 object-cover rounded-md mb-2">
      <h3 class="text-lg font-bold">${recipe.title}</h3>
    `;

    container.appendChild(recipeCard);
  });
}

// Ejecutar la función cuando el script se cargue
fetchRecipes();
