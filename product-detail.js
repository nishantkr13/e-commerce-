// Initialize cart from localStorage (or an empty array if no cart is found)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product data for each product page
const products = [
    { id: 1, name: "Asas Bivobook", price: 800, category: "Electronics", available: true, img: "images/product1.jpg", description: "Powerful laptop designed for seamless multitasking." },
    { id: 2, name: "Apul Aphone", price: 500, category: "Electronics", available: false, img: "images/product2.jpg", description: "Feature-packed smartphone with amazing camera." },
    { id: 3, name: "Krizol Knife", price: 100, category: "Home", available: true, img: "images/product3.jpg", description: "Sharp and durable kitchen knife." },
    { id: 4, name: "Mon BookSelf", price: 200, category: "Home", available: true, img: "images/product4.jpg", description: "Stylish and sturdy bookshelf for your home." },
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Find the product data for the specific product page
const product = products.find(p => p.id === productId);

// Check if product exists
if (product) {
    // Update product details on the page
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-price').innerText = `$${product.price}`;
    document.getElementById('product-category').innerText = `Category: ${product.category}`;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-image').src = product.img;

    // Set stock status
    const statusElement = document.getElementById('product-status');
    statusElement.innerText = product.available ? 'In Stock' : 'Out of Stock';

    // Handle Add to Cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.disabled = !product.available; // Disable button if not available

    addToCartBtn.addEventListener('click', () => {
        if (product.available) {
            // Add product to cart
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
            alert(`${product.name} has been added to your cart!`);
        } else {
            alert(`${product.name} is out of stock.`);
        }
    });
} else {
    console.error('Product not found!');
}
