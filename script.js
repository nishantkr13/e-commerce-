// Mock product data
const products = [
    { id: 1, name: "Product 1", price: 500, category: "Electronics", img: "images/product1.jpg" },
    { id: 2, name: "Product 2", price: 300, category: "Electronics", img: "images/product2.jpg" },
    { id: 3, name: "Product 3", price: 20, category: "Home", img: "images/product3.jpg" },
    { id: 4, name: "Product 4", price: 200, category: "Home", img: "images/product4.jpg" },
  ];
  
  // Cart
  let cart = [];
  
  // Render Products
  function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";
    filteredProducts.forEach(product => {
      productGrid.innerHTML += `
        <div class="product-card">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    });
  }
  
  // Add to Cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }
  
  // Filter by Price
  document.getElementById("price-range").addEventListener("input", function () {
    const maxPrice = this.value;
    document.getElementById("price-value").textContent = `Max: $${maxPrice}`;
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    renderProducts(filteredProducts);
  });
  
  // Initial Render
  renderProducts();
  