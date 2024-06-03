document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach((item, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <a href="#">
                  <img src="${item.image}" alt="${item.name}">
                </a>
                <div class="product-content">
                  <span class="product-name">${item.name}</span>
                  <span class="product-price">${item.price}원</span>
                  <button class="remove-from-cart" data-index="${index}">제거</button>
                </div>
            `;
            cartItemsElement.appendChild(productCard);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = totalPrice;
    }

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    });

    updateCart();
});
