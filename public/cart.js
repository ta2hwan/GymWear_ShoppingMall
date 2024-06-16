document.addEventListener('DOMContentLoaded', () => {
    // 장바구니 아이템을 불러오는 함수
    function loadCartItems() {
      fetch('/get-cart-items')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(items => {
          const cartItemsElement = document.getElementById('cart-items');
          const totalPriceElement = document.getElementById('total-price');
          let totalPrice = 0;
          
          cartItemsElement.innerHTML = '';  // 기존 아이템 삭제
          items.forEach(item => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
              <a href="#">
                <img src="${item.image}" alt="${item.name}">
              </a>
              <div class="product-content">
                <span class="product-name">${item.name}</span>
                <span class="product-price">${item.price}원</span>
                <button class="remove-from-cart" data-id="${item._id}">제거</button>
              </div>
            `;
            cartItemsElement.appendChild(productCard);
            totalPrice += item.price;
          });
          totalPriceElement.textContent = totalPrice;
        })
        .catch(error => {
          console.error('Error loading cart items:', error);
        });
    }
  
    // 장바구니 아이템 로드
    loadCartItems();
  
    // 장바구니 아이템 삭제 처리
    document.getElementById('cart-items').addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-from-cart')) {
        const itemId = event.target.getAttribute('data-id');
        fetch(`/remove-from-cart/${itemId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          alert(data.message);
          loadCartItems();  // 아이템 삭제 후 다시 로드
        })
        .catch(error => {
          console.error('Error removing item from cart:', error);
        });
      }
    });
  });
  