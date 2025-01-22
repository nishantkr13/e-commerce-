let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    { id: 1, name: "Asas Bivobook", price: 800, category: "Electronics", available: true, img: "images/product1.jpg", description: "Powerful laptop designed for seamless multitasking." },
    { id: 2, name: "Apul Aphone", price: 500, category: "Electronics", available: false, img: "images/product2.jpg", description: "Feature-packed smartphone with amazing camera." },
    { id: 3, name: "Krizol Knife", price: 100, category: "Home", available: true, img: "images/product3.jpg", description: "Sharp and durable kitchen knife." },
    { id: 4, name: "Mon BookSelf", price: 200, category: "Home", available: true, img: "images/product4.jpg", description: "Stylish and sturdy bookshelf for your home." },
];

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-price').innerText = `$${product.price}`;
    document.getElementById('product-category').innerText = `Category: ${product.category}`;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-image').src = product.img;

    const statusElement = document.getElementById('product-status');
    statusElement.innerText = product.available ? 'In Stock' : 'Out of Stock';

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.disabled = !product.available;

    addToCartBtn.addEventListener('click', () => {
        if (product.available) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart)); 
            alert(`${product.name} has been added to your cart!`);
        } else {
            alert(`${product.name} is out of stock.`);
        }
    });
} else {
    console.error('Product not found!');
}
