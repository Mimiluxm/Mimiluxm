document.addEventListener("DOMContentLoaded", () => {
  afiseazaCos();
  actualizeazaNumarProduse();
});

function afiseazaCos() {
  const cos = JSON.parse(localStorage.getItem("cos")) || [];
  const container = document.getElementById("cos-container");
  const checkoutButton = document.getElementById("checkout-button");
  const titluCos = document.getElementById("titlu-cos"); 
  const totalSection = document.getElementById("total-section"); 
  const footer = document.querySelector('.footer'); 
  container.innerHTML = "";
  let total = 0;

  
  function updateFooter() {
    const footer = document.querySelector('.footer');
    const cos = JSON.parse(localStorage.getItem("cos")) || [];
    
    if(window.matchMedia("(min-width: 769px)").matches) {
        if (cos.length < 3) {
          footer.style.position = "fixed";
          footer.style.bottom = "0";
          footer.style.width = "100%";
        } else {
          footer.style.position = "relative";
        }
      
    }
  }
  
  
  updateFooter();
  
  window.addEventListener("resize", updateFooter);
  
  

  if (cos.length === 0) {

      if (titluCos) titluCos.style.display = "none";
      if (totalSection) totalSection.style.display = "none";

      const mesajGol = document.createElement("div");
      mesajGol.style.textAlign = "center";
      mesajGol.style.padding = "20px";
      
      const mesajText = document.createElement("h2");
      mesajText.textContent = "Coșul dumneavoastră este gol";
      mesajGol.appendChild(mesajText);
      mesajText.style.color = "#ffbd49";

      const butonContinua = document.createElement("a");
      butonContinua.href = "../Pagini/produse.html"; 
      butonContinua.textContent = "Continuați cumpărăturile";
      butonContinua.style.display = "inline-block";
      butonContinua.style.marginTop = "1vh";
      butonContinua.style.padding = "10px 20px";
      butonContinua.style.backgroundColor = "#ffbd49";
      butonContinua.style.color = "white";
      butonContinua.style.textDecoration = "none";
      butonContinua.style.borderRadius = "5px";

      mesajGol.appendChild(butonContinua);
      container.appendChild(mesajGol);

      checkoutButton.style.display = "none";
      return;
  }

  if (titluCos) titluCos.style.display = "block";
  if (totalSection) totalSection.style.display = "block";

  cos.forEach((produs, index) => {
      const produsElement = document.createElement("div");
      produsElement.classList.add("cos-item");
      total += produs.pret * produs.cantitate;

      produsElement.innerHTML = `
          <div class="cos-item-row" style="display: flex; align-items: center; gap: 15px; padding: 10px; border-bottom: 1px solid #ddd;">
              <img src="${produs.imagine}" alt="${produs.nume}" class="product-image" style="width: 80px; height: auto; border-radius: 8px;">
              <h3 style="flex: 1; font-size: 16px; margin: 0;">${produs.nume}</h3>
              <p style="margin: 0; font-size: 16px;"><span id="pret-${index}">${produs.pret * produs.cantitate}</span> MDL</p>
              <div class="quantity-control" style="display: flex; align-items: center; gap: 5px;">
                  <button onclick="schimbaCantitate(${index}, -1)" style="padding: 0; margin: 0; font-size: 23px; color: black; border: none; background: none; border-radius: 5px; cursor: pointer;">-</button>
                  <span id="cantitate-${index}" style="min-width: 20px; text-align: center; font-size: 16px;">${produs.cantitate}</span>
                  <button onclick="schimbaCantitate(${index}, 1)" style="padding: 0; margin:0; background:none; font-size: 23px; color: black; border: none; border-radius: 5px; cursor: pointer;">+</button>
              </div>
              <button onclick="stergeProdus(${index})" style="padding: 5px 10px; font-size: 20px; background-color: transparent; color: black; font-weight:bold; border: none; cursor: pointer; font-weight: bold;"><i class="fa-solid fa-x"></i></button>
          </div>
      `;
      container.appendChild(produsElement);
  });

  document.getElementById("total-mdl").textContent = total;
  actualizeazaNumarProduse();

  checkoutButton.style.display = cos.length === 0 ? "none" : "block";
}

function schimbaCantitate(index, modificare) {
  const cos = JSON.parse(localStorage.getItem("cos"));
  if (cos[index].cantitate + modificare > 0) {
      cos[index].cantitate += modificare;
  }
  localStorage.setItem("cos", JSON.stringify(cos));
  afiseazaCos(); 
  actualizeazaNumarProduse();
}

function stergeProdus(index) {
  const cos = JSON.parse(localStorage.getItem("cos"));
  cos.splice(index, 1);
  localStorage.setItem("cos", JSON.stringify(cos));
  afiseazaCos(); 
  actualizeazaNumarProduse(); 
}

function actualizeazaNumarProduse() {
  const cos = JSON.parse(localStorage.getItem("cos")) || [];
  const numarProduse = cos.reduce((total, produs) => total + produs.cantitate, 0);
  
  document.querySelector(".cart-count").textContent = numarProduse;
}

function openCheckoutForm() {
  const cartSection = document.querySelector(".cart");  
  const checkoutForm = document.getElementById("checkout-form");
  const footer = document.querySelector('.footer');

  cartSection.style.display = 'none';
  checkoutForm.style.display = 'block';

  footer.style.position = "fixed";
  footer.style.bottom = "0";
  footer.style.width = "100%";
}

function closeCheckoutForm() {
  const cartSection = document.querySelector(".cart");  
  const checkoutForm = document.getElementById("checkout-form");

  cartSection.style.display = 'block';
  checkoutForm.style.display = 'none';

  updateFooter(); 
}


function submitOrder() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!firstName || !lastName || !phone || !email || !address) {
      alert('Vă rugăm să completați toate câmpurile!');
      return;
  }

  const phoneRegex = /^[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
      alert('Numărul de telefon trebuie să conțină exact 9 cifre și să nu includă litere!');
      return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Vă rugăm să introduceți o adresă de email validă!');
      return;
  }

  const cos = JSON.parse(localStorage.getItem("cos")) || [];
  const total = cos.reduce((sum, produs) => sum + produs.pret * produs.cantitate, 0);

  alert(`Vă mulțumim pentru comandă, ${firstName} ${lastName}!\nTotal: ${total} MDL.\nVă vom contacta la ${phone} sau prin email la ${email}.\nAdresa de livrare: ${address}`);
  window.location.href = "../index.html";

  localStorage.setItem("cos", JSON.stringify([]));
  afiseazaCos();

  document.getElementById("checkout-form").style.display = 'none';
  cartSection.style.display = 'block';
}

function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  lightboxImage.src = imageSrc;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

const productImages = document.querySelectorAll('.product-image');
productImages.forEach(image => {
  image.addEventListener('click', () => {
      openLightbox(image.src);
  });
});