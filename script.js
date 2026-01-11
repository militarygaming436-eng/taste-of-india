// NAVBAR TOGGLE FUNCTIONALITY ///
// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});






/// Auto slider for hero section image carousel ///
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Ensure slide index is within bounds
            currentSlide = (n + slides.length) % slides.length;
            
            // Show the current slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Function for next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Function for previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Start automatic sliding
        function startSlider() {
            slideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
        }
        
        // Stop automatic sliding
        function stopSlider() {
            clearInterval(slideInterval);
        }
        
        // Event listeners for buttons
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
                stopSlider();
                startSlider();
            });
        });
        
        // Pause slider when hovering over it
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
        
        // Initialize the slider
        startSlider();
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopSlider();
                startSlider();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopSlider();
                startSlider();
            }
        });
    });







    // WHY CHOOSE US SECTION - TABS FUNCTIONALITY ///
    // Optimized testimonial slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let slideInterval;
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function showTestimonial(n) {
        testimonials[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners with debounce
    prevBtn.addEventListener('click', debounce(() => {
        showTestimonial(currentTestimonial - 1);
        stopAutoSlide();
        startAutoSlide();
    }, 200));
    
    nextBtn.addEventListener('click', debounce(() => {
        showTestimonial(currentTestimonial + 1);
        stopAutoSlide();
        startAutoSlide();
    }, 200));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', debounce(() => {
            showTestimonial(index);
            stopAutoSlide();
            startAutoSlide();
        }, 200));
    });
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    const testimonialSection = document.querySelector('.testimonial-section');
    testimonialSection.addEventListener('mouseenter', stopAutoSlide);
    testimonialSection.addEventListener('mouseleave', startAutoSlide);
});


/// ABOUT PAGE - ANIMATIONS ON SCROLL ///
// Simple script for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});




/// MENU PAGE - FILTERABLE MENU ITEMS ////

document.addEventListener("DOMContentLoaded", () => {

    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");

    let cart = [];

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll(
        ".add-to-cart-btn, .special-order-btn"
    );

    addToCartButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const itemName = btn.getAttribute("data-item");
            const itemPrice = parseInt(btn.getAttribute("data-price"));

            addItemToCart(itemName, itemPrice);
        });
    });

    function addItemToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        renderCart();
    }

    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    function changeQty(name, change) {
        const item = cart.find(i => i.name === name);
        if (!item) return;

        item.qty += change;

        if (item.qty <= 0) {
            removeItem(name);
        } else {
            renderCart();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML =
                `<p class="empty-cart">No items added yet</p>`;
            cartTotalElement.textContent = "0";
            return;
        }

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>₹${item.price} x ${item.qty}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn" data-action="decrease">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" data-action="increase">+</button>
                    <button class="remove-btn">✕</button>
                </div>
            `;

            // Quantity buttons
            div.querySelector('[data-action="increase"]')
                .addEventListener("click", () => changeQty(item.name, 1));

            div.querySelector('[data-action="decrease"]')
                .addEventListener("click", () => changeQty(item.name, -1));

            // Remove button
            div.querySelector(".remove-btn")
                .addEventListener("click", () => removeItem(item.name));

            cartItemsContainer.appendChild(div);
        });

        cartTotalElement.textContent = total;
    }

});



/// ORDER PAGE - CART FUNCTIONAYLITY ///
// ====== GLOBAL VARIABLES ======
let cart = [];
let currentOrderType = 'delivery';
let currentCategory = 'appetizers';

// ====== DOM ELEMENTS ======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements
    initializeElements();
    setupEventListeners();
    updateCartDisplay();
});

function initializeElements() {
    // Order type buttons
    orderTypeButtons = document.querySelectorAll('.order-type');
    
    // Category tabs
    categoryTabs = document.querySelectorAll('.category-tab');
    categoryContents = document.querySelectorAll('.category-content');
    
    // Menu item controls
    minusButtons = document.querySelectorAll('.quantity-btn.minus');
    plusButtons = document.querySelectorAll('.quantity-btn.plus');
    addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Checkout button
    checkoutBtn = document.getElementById('checkout-btn');
    
    // Card details section
    paymentOptions = document.querySelectorAll('input[name="payment"]');
    cardDetailsSection = document.getElementById('card-details');
}

// ====== EVENT LISTENERS SETUP ======
function setupEventListeners() {
    // Order type selection
    orderTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            setOrderType(type);
        });
    });
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });
    
    // Quantity controls
    minusButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    // Payment method toggle
    paymentOptions.forEach(option => {
        option.addEventListener('change', toggleCardDetails);
    });
    
    // Special requests auto-save
    const specialRequests = document.querySelector('#special-requests textarea');
    if (specialRequests) {
        specialRequests.addEventListener('input', function() {
            localStorage.setItem('specialRequests', this.value);
        });
        
        // Load saved requests
        const savedRequests = localStorage.getItem('specialRequests');
        if (savedRequests) {
            specialRequests.value = savedRequests;
        }
    }
}

// ====== ORDER TYPE FUNCTIONALITY ======
function setOrderType(type) {
    currentOrderType = type;
    
    // Update active button
    orderTypeButtons.forEach(button => {
        if (button.getAttribute('data-type') === type) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Show/hide delivery info
    const deliveryInfo = document.getElementById('delivery-info');
    if (type === 'delivery') {
        deliveryInfo.style.display = 'block';
    } else {
        deliveryInfo.style.display = 'none';
    }
    
    // Update delivery fee
    updateDeliveryFee(type);
    
    // Save to localStorage
    localStorage.setItem('orderType', type);
}

function updateDeliveryFee(type) {
    const deliveryFeeElement = document.querySelector('.price-row:nth-child(3) span:last-child');
    if (!deliveryFeeElement) return;
    
    if (type === 'delivery') {
        deliveryFeeElement.textContent = '$3.99';
    } else {
        deliveryFeeElement.textContent = '$0.00';
    }
    
    updateOrderTotal();
}

// ====== CATEGORY MANAGEMENT ======
function switchCategory(category) {
    currentCategory = category;
    
    // Update active tab
    categoryTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Show selected category content
    categoryContents.forEach(content => {
        if (content.id === category) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Scroll to category
    document.getElementById(category).scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ====== QUANTITY CONTROLS ======
function decreaseQuantity(e) {
    const button = e.target;
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        
        // Update add to cart button text
        const addToCartBtn = button.closest('.item-controls').querySelector('.add-to-cart');
        if (quantity === 0) {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.style.background = '#ff9800';
        } else {
            addToCartBtn.textContent = `Add ${quantity} to Cart`;
        }
    }
}

function increaseQuantity(e) {
    const button = e.target;
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    
    quantity++;
    quantityElement.textContent = quantity;
    
    // Update add to cart button text
    const addToCartBtn = button.closest('.item-controls').querySelector('.add-to-cart');
    addToCartBtn.textContent = `Add ${quantity} to Cart`;
}

// ====== CART FUNCTIONALITY ======
function addItemToCart(e) {
    const button = e.target;
    const menuItem = button.closest('.menu-item');
    const itemName = menuItem.querySelector('h3').textContent;
    const itemPrice = parseFloat(menuItem.querySelector('.item-price').textContent.replace('$', ''));
    const quantity = parseInt(menuItem.querySelector('.quantity').textContent);
    
    if (quantity === 0) {
        showNotification('Please select at least 1 item', 'warning');
        return;
    }
    
    // Get spice level if exists
    let spiceLevel = 'Mild';
    const spiceSelect = menuItem.querySelector('select');
    if (spiceSelect) {
        spiceLevel = spiceSelect.value;
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.name === itemName && item.spiceLevel === spiceLevel
    );
    
    if (existingItemIndex > -1) {
        // Update existing item quantity
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].quantity * itemPrice;
    } else {
        // Add new item to cart
        const cartItem = {
            name: itemName,
            price: itemPrice,
            quantity: quantity,
            spiceLevel: spiceLevel,
            total: itemPrice * quantity
        };
        cart.push(cartItem);
    }
    
    // Reset quantity
    menuItem.querySelector('.quantity').textContent = '0';
    button.textContent = 'Add to Cart';
    button.style.background = '#ff9800';
    
    // Update cart display
    updateCartDisplay();
    
    // Show success notification
    showNotification(`${quantity} ${itemName} added to cart!`, 'success');
    
    // Save cart to localStorage
    saveCartToStorage();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.querySelector('.price-row:nth-child(1) span:last-child');
    const taxElement = document.querySelector('.price-row:nth-child(2) span:last-child');
    const totalElement = document.querySelector('.price-row.total span:last-child');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        subtotalElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = currentOrderType === 'delivery' ? '$3.99' : '$0.00';
        return;
    }
    
    // Clear cart display
    cartItemsContainer.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    
    // Add each cart item to display
    cart.forEach((item, index) => {
        subtotal += item.total;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.spiceLevel !== 'Mild' ? `<div class="cart-item-spice">Spice: ${item.spiceLevel}</div>` : ''}
                <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div class="cart-item-total">$${item.total.toFixed(2)}</div>
            <button class="remove-item" data-index="${index}">×</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeCartItem);
    });
    
    // Calculate totals
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const deliveryFee = currentOrderType === 'delivery' ? 3.99 : 0;
    const total = subtotal + tax + deliveryFee;
    
    // Update totals display
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function removeCartItem(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const removedItem = cart[index];
    
    cart.splice(index, 1);
    updateCartDisplay();
    saveCartToStorage();
    
    showNotification(`${removedItem.name} removed from cart`, 'info');
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    localStorage.removeItem('cart');
    showNotification('Cart cleared', 'info');
}

// ====== CHECKOUT FUNCTIONALITY ======
function proceedToCheckout() {
    // Validate delivery info for delivery orders
    if (currentOrderType === 'delivery') {
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        
        if (!street || !city || !zip) {
            showNotification('Please fill in all delivery address fields', 'error');
            return;
        }
    }
    
    // Validate cart
    if (cart.length === 0) {
        showNotification('Your cart is empty. Please add items to proceed.', 'warning');
        return;
    }
    
    // Validate payment method
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        showNotification('Please select a payment method', 'error');
        return;
    }
    
    if (selectedPayment.value === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !expiry || !cvv) {
            showNotification('Please fill in all card details', 'error');
            return;
        }
        
        // Simple card validation
        if (!validateCardNumber(cardNumber)) {
            showNotification('Please enter a valid card number', 'error');
            return;
        }
        
        if (!validateExpiry(expiry)) {
            showNotification('Please enter a valid expiry date (MM/YY)', 'error');
            return;
        }
        
        if (!validateCVV(cvv)) {
            showNotification('Please enter a valid CVV (3-4 digits)', 'error');
            return;
        }
    }
    
    // Get special requests
    const specialRequests = document.querySelector('#special-requests textarea').value;
    
    // Prepare order data
    const orderData = {
        orderType: currentOrderType,
        items: cart,
        specialRequests: specialRequests,
        paymentMethod: selectedPayment.value,
        timestamp: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };
    
    // Add delivery info if applicable
    if (currentOrderType === 'delivery') {
        orderData.deliveryAddress = {
            street: document.getElementById('street').value,
            apartment: document.getElementById('apartment').value || '',
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            instructions: document.getElementById('instructions').value || ''
        };
    }
    
    // In a real app, you would send this to your backend
    console.log('Order submitted:', orderData);
    
    // Show success message
    showNotification(`Order #${orderData.orderNumber} placed successfully! Estimated ${currentOrderType === 'delivery' ? 'delivery' : 'pickup'} time: 45-60 minutes`, 'success');
    
    // Clear cart
    clearCart();
    
    // Reset form
    if (currentOrderType === 'delivery') {
        document.getElementById('address-form').reset();
    }
    
    // Redirect or show confirmation
    setTimeout(() => {
        alert(`Thank you for your order!\nOrder #: ${orderData.orderNumber}\nTotal: $${calculateOrderTotal()}\nYou will receive a confirmation SMS shortly.`);
    }, 500);
}

// ====== PAYMENT VALIDATION ======
function toggleCardDetails() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment && selectedPayment.value === 'card') {
        cardDetailsSection.style.display = 'block';
    } else {
        cardDetailsSection.style.display = 'none';
    }
}

function validateCardNumber(cardNumber) {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    // Simple validation - check if it's all numbers and 13-19 digits
    return /^\d{13,19}$/.test(cleanNumber);
}

function validateExpiry(expiry) {
    // Format: MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    const expiryMonth = parseInt(month);
    const expiryYear = parseInt(year);
    
    if (expiryMonth < 1 || expiryMonth > 12) return false;
    
    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
    
    return true;
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// ====== UTILITY FUNCTIONS ======
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">×</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return timestamp.slice(-6) + random;
}

function calculateOrderTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.total;
    });
    
    const tax = subtotal * 0.08;
    const deliveryFee = currentOrderType === 'delivery' ? 3.99 : 0;
    
    return (subtotal + tax + deliveryFee).toFixed(2);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// ====== NOTIFICATION STYLES (Add to CSS) ======
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    max-width: 400px;
    transform: translateX(150%);
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    background: #4caf50;
    border-left: 4px solid #2e7d32;
}

.notification.error {
    background: #f44336;
    border-left: 4px solid #c62828;
}

.notification.warning {
    background: #ff9800;
    border-left: 4px solid #ef6c00;
}

.notification.info {
    background: #2196f3;
    border-left: 4px solid #0d47a1;
}

.close-notification {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
    padding: 0 0.5rem;
}

.close-notification:hover {
    opacity: 0.8;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-info {
    flex: 1;
}

.cart-item-name {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.cart-item-spice {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 0.25rem;
}

.cart-item-price {
    font-size: 0.9rem;
    color: #888;
}

.cart-item-total {
    font-weight: bold;
    margin: 0 1rem;
}

.remove-item {
    background: #f44336;
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}

.remove-item:hover {
    background: #d32f2f;
}
`;

// Add notification styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Load saved cart on page load
window.addEventListener('load', loadCartFromStorage);

// Load saved order type
const savedOrderType = localStorage.getItem('orderType');
if (savedOrderType) {
    setOrderType(savedOrderType);
}