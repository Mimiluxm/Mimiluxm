const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const cartContainer = document.querySelector('.cart');
const checkoutForm = document.querySelector('.checkout-form');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cartItems.push(product);
    updateCart();
    saveCartToLocalStorage();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCart() {
    cartCount.textContent = cartItems.length;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} MDL</span>
            <button class="delete" onclick="removeFromCart(${index})">-</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: ${total} MDL`;
}

function toggleCart() {
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}

function showCheckoutForm() {
    if (cartItems.length === 0) {
        alert('Coșul de cumpărături este gol!');
        return;
    }
    checkoutForm.style.display = 'block';
}

function submitOrder() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!firstName || !lastName || !phone || !email || !address) {
        alert('Vă rugăm să completați toate câmpurile!');
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    alert(`Vă mulțumin pentru comandă, ${firstName} ${lastName}!\nTotal: ${total} MDL.\nVă vom contacta la ${phone} sau prin email la ${email}.\nAdresa de livrare: ${address}`);

    cartItems.length = 0;
    updateCart();
    saveCartToLocalStorage();

    cartContainer.style.display = 'none';
    checkoutForm.style.display = 'none';
}

updateCart();


// Pentru butonul de scroll pana sus
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }

    const footerTop = footer.getBoundingClientRect().top;
    const buttonHeight = scrollToTopBtn.offsetHeight;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - buttonHeight) {
        scrollToTopBtn.style.bottom = `${windowHeight - footerTop + 20}px`;
    } else {
        scrollToTopBtn.style.bottom = "20px"; 
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
