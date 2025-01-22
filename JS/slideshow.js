const slideTrack = document.querySelector('.slide-track');
const products = Array.from(document.querySelectorAll('.product'));

function duplicateSlides() {
  const trackWidth = slideTrack.scrollWidth; 
  const containerWidth = document.querySelector('.product-slideshow').offsetWidth;

  while (slideTrack.scrollWidth < containerWidth * 2) {
    products.forEach(product => {
      const clonedProduct = product.cloneNode(true);
      slideTrack.appendChild(clonedProduct);
    });
  }
}

duplicateSlides();