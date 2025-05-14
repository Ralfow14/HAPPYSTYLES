function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product} added to cart!`);
  }
  
  function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    cartItems.innerHTML = "";
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }
  
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const products = document.querySelectorAll('.product');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute('data-category');
            
            products.forEach(product => {
                if (product.getAttribute('data-category') === selectedCategory) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
    
    // Optional: Reset filter (show all products)
    // Add this button somewhere in your HTML: <button id="showAll">Show All</button>
    document.getElementById('showAll')?.addEventListener('click', function() {
        products.forEach(product => {
            product.style.display = 'block';
        });
    });
});


let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

function addToCart(productName, price, imageUrl = '') {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
    showFeedback(`${productName} quantity updated!`, '#27ae60');
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1,
      image: imageUrl
    });
    showFeedback(`${productName} added to cart!`, '#27ae60');
  }

  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  showFeedback(`${productName} removed from cart!`, '#e74c3c');
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsList = document.getElementById('cartItems');
  const totalQty = document.getElementById('totalQuantity');
  const totalAmt = document.getElementById('totalAmount');

  if (!cartItemsList || !totalQty || !totalAmt) return;

  cartItemsList.innerHTML = '';

  let totalQuantity = 0;
  let totalAmount = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li style="padding: 20px; text-align: center; color: #7f8c8d;">Your cart is empty</li>';
  } else {
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div>
          ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px;">` : ''}
          <strong>${item.name}</strong><br>
          Ksh. ${item.price} × ${item.quantity} = Ksh. ${itemTotal}
        </div>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;
      cartItemsList.appendChild(li);
      totalQuantity += item.quantity;
      totalAmount += itemTotal;
    });
  }

  totalQty.textContent = totalQuantity;
  totalAmt.textContent = `Ksh. ${totalAmount}`;
}

function showFeedback(message, color) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${color};
    color: white;
    border-radius: 5px;
    z-index: 1100;
    font-size: 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: fadeInOut 2s ease-in-out;
  `;
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();

  // Font Awesome for icons
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = '';
    document.head.appendChild(faLink);
  }

  // Animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(-20px); }
      20% { opacity: 1; transform: translateY(0); }
      80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
});

function filterProducts(category) {
    // Get all product articles
    const products = document.querySelectorAll('.product');
    
    // Loop through each product and hide/show based on category
    products.forEach(function(product) {
        if (category === 'all' || product.id === category) {
            product.style.display = 'block'; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}