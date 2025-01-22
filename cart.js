let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart)); 
  renderCart(); 
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  alert("Proceeding to checkout!");
}

document.getElementById("go-back-btn").addEventListener("click", function() {
  window.location.href = "index.html"; // Redirect to homepage
});

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

document.getElementById("checkout-btn").addEventListener("click", checkout);

renderCart();
