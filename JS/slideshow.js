const slideTrack = document.querySelector('.slide-track');
const products = document.querySelectorAll('.product');


function duplicateSlides() {
    products.forEach(product => {
        const clonedProduct = product.cloneNode(true);
        slideTrack.appendChild(clonedProduct);
    });
}


duplicateSlides();
