// const API_KEY = 'fc0058ed0dec446a9efc204019bab581';
const LIMIT = 20; 
// const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${LIMIT}`;

let cart = []; // Carrito de compras

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
  const cartContainer = document.getElementById('CARRITO');

  if (!container || !cartContainer) {
    console.error('Faltan contenedores requeridos.');
    return;
  }

  // Limpiar el contenedor de recetas
  container.innerHTML = '';

  recipes.forEach((recipe) => {
    const price = (Math.random() * 10 + 5).toFixed(2); // Precio aleatorio entre $5 y $15
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card bg-white rounded-md shadow-md p-4 flex items-start justify-between flex-col ';

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-40 object-cover rounded-md mb-2">
      <h3 class="text-lg font-bold">${recipe.title}</h3>
      <p class="text-gray-600 mb-2">Precio: $<span class="price">${price}</span></p>
      <div class=" w-full flex items-center justify-between space-x-2 mb-2">
        <div>
          <button class="decrement bg-gray-200 px-2 py-1 rounded">-</button>
          <span class="quantity">1</span>
          <button class="increment bg-gray-200 px-2 py-1 rounded">+</button>
        </div>
        <button class="add-to-cart  text-black  rounded transition hover:scale-110"><i class="ri-shopping-cart-line"></i></button>
      </div>

    `;

    // Funcionalidad de los botones
    const quantityEl = recipeCard.querySelector('.quantity');
    const decrementBtn = recipeCard.querySelector('.decrement');
    const incrementBtn = recipeCard.querySelector('.increment');
    const addToCartBtn = recipeCard.querySelector('.add-to-cart');

    let quantity = 1;

    decrementBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });

    incrementBtn.addEventListener('click', () => {
      quantity++;
      quantityEl.textContent = quantity;
    });

    addToCartBtn.addEventListener('click', () => {
      const item = {
        title: recipe.title,
        price: parseFloat(price),
        quantity,
        image: recipe.image,
      };

      // Agregar o actualizar el carrito
      const existingItem = cart.find((cartItem) => cartItem.title === item.title);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push(item);
      }

      renderCart(cart, cartContainer);
    });

    container.appendChild(recipeCard);
  });
}

function renderCart(cart, container) {
  // Limpiar el contenedor del carrito
  container.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item flex items-center space-x-4 p-2 border-b';

    cartItem.innerHTML = `
      <div class="flex items-center justify-between gap-4 w-full">
        <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded-md">
        <div class="flex-1">
          <h4 class="font-bold">${item.title}</h4>
          <p class="text-gray-600">Precio unitario: $${item.price.toFixed(2)}</p>
          <div class="flex items-center gap-2 mt-2">
            <label for="quantity-${index}" class="text-sm">Cantidad:</label>
            <input 
              type="number" 
              id="quantity-${index}" 
              class="w-16 border rounded-md px-2 py-1" 
              value="${item.quantity}" 
              min="1"
              onchange="updateCartItemQuantity(${index}, this.value)"
            >
          </div>
          <p class="text-gray-600 mt-1">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button 
          class="bg-red-600 text-black px-2 py-1 rounded-md"
          onclick="removeCartItem(${index})"
        >
          Eliminar
        </button>
      </div>
    `;

    container.appendChild(cartItem);
  });

  // Mostrar el total acumulado
  const totalContainer = document.createElement('div');
  totalContainer.className = 'total p-4 font-bold text-lg text-right';
  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  container.appendChild(totalContainer);
}

function updateCartItemQuantity(index, newQuantity) {
  const quantity = parseInt(newQuantity, 10);
  if (!isNaN(quantity) && quantity > 0) {
    cart[index].quantity = quantity;
    const cartContainer = document.getElementById('CARRITO');
    renderCart(cart, cartContainer);
  }
}

function removeCartItem(index) {
  cart.splice(index, 1); // Elimina el producto del carrito
  const cartContainer = document.getElementById('CARRITO');
  renderCart(cart, cartContainer);
}

// Ejecutar la función cuando el script se cargue
fetchRecipes();