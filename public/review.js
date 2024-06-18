document.addEventListener('DOMContentLoaded', () => {
    let purchasedItems = [];
  
    // 구매한 상품 불러오기
    fetch('/get-purchased-items')
      .then(response => response.json())
      .then(items => {
        purchasedItems = items;  // 나중에 이미지 URL을 찾기 위해 저장
        const productSelect = document.getElementById('product');
        items.forEach(item => {
          const option = document.createElement('option');
          option.value = item._id;
          option.textContent = item.name;
          productSelect.appendChild(option);
        });
      })
  
    // 리뷰 작성 폼 제출 처리
    document.getElementById('review-form').addEventListener('submit', event => {
      event.preventDefault();
  
      const productSelect = document.getElementById('product');
      const selectedProductId = productSelect.value;
      const selectedProduct = purchasedItems.find(item => item._id === selectedProductId);
      const rating = document.getElementById('rating').value;
      const reviewText = document.getElementById('review-text').value;
  
      const reviewContainer = document.createElement('div');
      reviewContainer.classList.add('product-review');
      reviewContainer.innerHTML = `
        <div class="product-card">
          <a href="#">
            <img src="${selectedProduct.image}">
          </a>
          <div class="product-content">
            <span class="product-name">${selectedProduct.name}</span>
            <span class="product-price">${selectedProduct.price}원</span>
          </div>
        </div>
        <div class="review">
          <div class="text">${reviewText}</div>
          <hr>
          <p><strong>별점: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</strong></p>
        </div>
      `;
      document.getElementById('reviews-container').appendChild(reviewContainer);
  
      // 폼 초기화
      productSelect.value = '';
      document.getElementById('rating').value = '5';
      document.getElementById('review-text').value = '';
    });
  });
  