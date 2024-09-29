// DOM Elements
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalQuantity = document.getElementById('modal-quantity');
const closeModal = document.getElementById('close-modal');

let products = [];

// Fetch products from the Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products);
}

// Display products in cards
function displayProducts(productsToDisplay) {
    // Clear existing products
    productContainer.innerHTML = ''; 
    
    productsToDisplay.forEach(product => {
        // Create the product card div
        const card = document.createElement('div');
        card.classList.add('product-card'); 
        
        // Create the product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product-image'); 

        // Create the product title (h2)
        const title = document.createElement('h2');
        title.textContent = product.title;
        title.classList.add('product-title'); 

        // Create the product price (p)
        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.classList.add('product-price'); 

        // Append the elements to the card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);

        // Add click event to open modal with product details
        card.onclick = () => openModal(product);

        // Append the card to the product container
        productContainer.appendChild(card);
    });
}

// Open modal with product details
function openModal(product) {
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;

    // Random quantity
    modalQuantity.textContent = `Available Quantity: ${Math.floor(Math.random() * 100) + 1}`; 
    
    modal.classList.remove('hidden');
}

// Close modal
closeModal.onclick = () => {
    modal.classList.add('hidden');
};

// Search functionality
searchInput.oninput = () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
};

// Initialize
fetchProducts();
