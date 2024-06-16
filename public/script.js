document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image');

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
    });
  });
});
