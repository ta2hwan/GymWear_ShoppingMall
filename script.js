document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          const price = parseInt(button.getAttribute('data-price'));
          const image = button.getAttribute('data-image');

          const cartItem = { name, price, image };
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          cartItems.push(cartItem);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          alert('장바구니에 추가되었습니다.');
      });
  }); 
});