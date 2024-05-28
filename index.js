
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const products = await response.json();
                return products;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        // 상품 목록을 화면에 표시하는 함수
        function renderProducts(products) {
            const productListElement = document.getElementById('product-list');
            productListElement.innerHTML = ''; // 기존 내용 지우기

            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="viewProduct(${product.id})">View Details</button>
                `;
                productListElement.appendChild(productElement);
            });
        }

        // 상세 정보 페이지로 이동하는 함수
        function viewProduct(productId) {
            window.location.href = `/product.html?id=${productId}`;
        }

        // 페이지 로드 시 상품 목록 가져와서 화면에 표시
        document.addEventListener('DOMContentLoaded', async () => {
            const products = await fetchProducts();
            renderProducts(products);
        });