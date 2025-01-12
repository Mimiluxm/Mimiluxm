const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const cartSection = document.querySelector('.cart');
const checkoutForm = document.querySelector('.checkout-form');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCart() {
  cartItemsContainer.innerHTML = ''; 
  let total = 0;

  cartItems.forEach((item, index) => {
    console.log(item); 
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}"> 
        <span class="item-name">${item.name}</span>
      </div>
      <span class="item-price">${item.price} MDL</span>
      <button class="delete" onclick="removeItem(${index})">-</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.price;
  });

  totalPriceElement.textContent = `Total: ${total} MDL`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart(); 
  localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
}

function openCheckout() {
  if (cartItems.length === 0) {
    alert('Coșul este gol! Adăugați produse înainte de a finaliza comanda.');
    return;
  }

  cartSection.style.display = 'none';
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

  alert(`Vă mulțumim pentru comandă, ${firstName} ${lastName}!\nTotal: ${total} MDL.\nVă vom contacta la ${phone} sau prin email la ${email}.\nAdresa de livrare: ${address}`);

  cartItems.length = 0;
  updateCart();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  checkoutForm.style.display = 'none';
  cartSection.style.display = 'block';
}

updateCart();