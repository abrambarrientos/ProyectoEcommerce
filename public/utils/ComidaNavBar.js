

    const cart = []; // Carrito de compras

    function addToCart(item) {
        const existingItem = cart.find((cartItem) => cartItem.title === item.title);

        if (existingItem) {
        existingItem.quantity += item.quantity;
        } else {
        cart.push(item);
        }

        updateCart();
    }

    function updateCart() {
        const cartItems = document.getElementById("cartItems");
        const cartTotal = document.getElementById("cartTotal");
        const cartItemsMobile = document.getElementById("cartItemsMobile");
        const cartTotalMobile = document.getElementById("cartTotalMobile");

        cartItems.innerHTML = "";
        cartItemsMobile.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItemHTML = `
            <div class="flex items-center  gap-4 border-b p-2 z-10">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-md">
            <div>
                <h4 class="font-bold">${item.title}</h4>
                <p class="text-gray-600">Precio: $${item.price.toFixed(2)}</p>
                <div class="flex items-center gap-2 mt-1">
                <label for="quantity-${index}" class="text-sm">Cantidad:</label>
                <input 
                    type="number" 
                    id="quantity-${index}" 
                    class="w-16 border rounded-md px-2 py-1" 
                    value="${item.quantity}" 
                    min="1"
                    onchange="updateQuantity(${index}, this.value)"
                >
                </div>
                <p class="text-gray-600 mt-1">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button 
                class="bg-red-500 text-white px-2 py-1 rounded-md ml-auto"
                onclick="removeFromCart(${index})"
            >
                Eliminar
            </button>
            </div>
        `;
        cartItems.innerHTML += cartItemHTML;
        cartItemsMobile.innerHTML += cartItemHTML;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartTotalMobile.textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateQuantity(index, newQuantity) {
        const quantity = parseInt(newQuantity, 10);
        if (!isNaN(quantity) && quantity > 0) {
        cart[index].quantity = quantity;
        updateCart();
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1); // Elimina el producto del carrito
        updateCart();
    }