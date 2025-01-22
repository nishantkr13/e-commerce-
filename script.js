
const products = [
  { id: 1, name: "Asas Bivobook", price: 800, category: "Electronics", available: true, img: "images/product1.jpg" },
  { id: 2, name: "Apul Aphone", price: 500, category: "Electronics", available: false, img: "images/product2.jpg" },
  { id: 3, name: "Krizol Knife", price: 100, category: "Home", available: true, img: "images/product3.jpg" },
  { id: 4, name: "Mon BookSelf", price: 200, category: "Home", available: true, img: "images/product4.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts(filteredProducts = products) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; 

  filteredProducts.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <a href="product${product.id}.html">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <p>${product.available ? "In Stock" : "Out of Stock"}</p>
        </a>
        <button onclick="addToCart(${product.id})" ${!product.available ? 'disabled' : ''}>Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function filterProducts() {
  const maxPrice = document.getElementById("price-range").value;
  const selectedCategory = document.getElementById("category-select").value;
  const selectedAvailability = document.getElementById("availability-select").value;

  const filteredProducts = products.filter(product => {
      const isPriceValid = product.price <= maxPrice;
      const isCategoryValid = selectedCategory === "all" || product.category === selectedCategory;
      
      let isAvailabilityValid = true;
      if (selectedAvailability === "available") {
          isAvailabilityValid = product.available;
      } else if (selectedAvailability === "out-of-stock") {
          isAvailabilityValid = !product.available;
      }

      return isPriceValid && isCategoryValid && isAvailabilityValid;
  });

  renderProducts(filteredProducts);
}

document.getElementById("reset-filters").addEventListener("click", resetFilters);

function resetFilters() {

  const priceSlider = document.getElementById("price-range");
  priceSlider.value = 1000; 
  document.getElementById("price-value").innerText = `Max: $1000`; // Update the text displaying the price value

  document.getElementById("category-select").value = "all";

  document.getElementById("availability-select").value = "all";

  renderProducts();
}

document.getElementById("price-range").addEventListener("input", function() {
    const currentValue = this.value;
    document.getElementById("price-value").innerText = `Max: $${currentValue}`;
    filterProducts(); 
});

document.getElementById("category-select").addEventListener("change", filterProducts);
document.getElementById("availability-select").addEventListener("change", filterProducts);

document.getElementById("cart-btn").addEventListener("click", () => {
    window.location.href = "cart.html"; // Redirect to cart page
});

renderProducts();
