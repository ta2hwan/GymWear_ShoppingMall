document.addEventListener('DOMContentLoaded', () => {
    //장바구니 아이템을 불러오는 함수
    function loadCartItems() {
        fetch('/get-cart-items')
            .then(response => response.json())
            .then(items => {
                const cartItemsElement = document.getElementById('cart-items');
                const totalPriceElement = document.querySelector('.total-price span');
                let totalPrice = 0;

                cartItemsElement.innerHTML = ''; 

                items.forEach(item => {
                    if (!item.purchased) {  // 구매되지 않은 상품 표시
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
                    }
                });

                totalPriceElement.textContent = totalPrice;
            });
    }
    // 장바구니 아이템 로드
    loadCartItems();

    // 장바구니 아이템 삭제 처리
    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const itemId = event.target.getAttribute('data-id');
            const removeConfirm = window.confirm("정말로 이 아이템을 삭제하시겠습니까?");

            if (removeConfirm) {
                fetch(`/remove-from-cart/${itemId}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        loadCartItems();  // 아이템 삭제 후 다시 로드
                    });
            }
            else {
                alert('삭제가 취소되었습니다.');
            }
        }
    });


    document.getElementById('checkout-button').addEventListener('click', () => {
        const totalPrice = parseInt(document.querySelector('.total-price span').textContent, 10);

        if (totalPrice > 0) {
            const purchaseConfirm = window.confirm("정말로 구매하시겠습니까?");

            if (purchaseConfirm) {
                fetch('/checkout', { method: 'POST' })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        alert(data.message);
                        loadCartItems();  // 결제 후 장바구니 아이템 다시 로드
                    });
            }
            else {
                alert('결제가 취소되었습니다.');
            }
        }
        else {
            alert('장바구니가 비어 있습니다.');
        }
    });
});
