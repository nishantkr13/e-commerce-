// Mock product data
const products = [
    { id: 1, name: "Asas Bivobook ", price: 800, category: "Electronics", available: true, img: "images/product1.jpg" },
    { id: 2, name: "Apul Aphone", price: 500, category: "Electronics", available: false, img: "images/product2.jpg" },
    { id: 3, name: "Krizol Knife", price: 100, category: "Home", available: true, img: "images/product3.jpg" },
    { id: 4, name: "Mon BookSelf", price: 200, category: "Home", available: true, img: "images/product4.jpg" },
  ];
  
  // Render products to the grid
  function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = ""; // Clear previous products
    filteredProducts.forEach(product => {
      productGrid.innerHTML += `
        <div class="product-card">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <p>${product.available ? "In Stock" : "Out of Stock"}</p>
          <button onclick="addToCart(${product.id})" ${!product.available ? 'disabled' : ''}>Add to Cart</button>
        </div>
      `;
    });
  }
  
  // Add to Cart functionality
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`${product.name} added to cart!`);
  }
  
  // Filter products by Price, Category, and Availability
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
  
  // Show all products
  document.getElementById("all-btn").addEventListener("click", () => {
    renderProducts(); // Display all products
  });
  
  // Filter event listeners
  document.getElementById("price-range").addEventListener("input", filterProducts);
  document.getElementById("category-select").addEventListener("change", filterProducts);
  document.getElementById("availability-select").addEventListener("change", filterProducts);
  
  // Initial render of all products
  renderProducts();
  