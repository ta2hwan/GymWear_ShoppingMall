document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image');
      
      // 사용자에게 확인 메시지 표시
      const confirmAdd = confirm('장바구니에 상품을 추가하시겠습니까?');
      
      if (confirmAdd) {
        const cartItem = { name, price, image };

        fetch('/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cartItem)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          console.log('Success:', data);
          alert(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
  });
});
