// Retrieve cart items from localStorage or initialize as empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items on page load
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear the cart container first

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }
}

// Remove item from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  renderCart(); // Re-render cart after removal
}

// Clear all items in the cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  renderCart(); // Re-render empty cart
}

// Handle checkout (This can be updated later for a real checkout process)
function checkout() {
  alert("Proceeding to checkout!");
  // Logic for proceeding to checkout (e.g., navigating to a checkout page or payment system)
}

// Go back to the previous page (index.html)
document.getElementById("go-back-btn").addEventListener("click", function() {
  window.location.href = "index.html"; // Redirect to homepage
});

// Clear cart functionality
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Proceed to checkout functionality
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Initial render of cart items
renderCart();
