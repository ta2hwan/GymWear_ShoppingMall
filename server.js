const express = require('express');
const app = express();
const PORT = 3000;

// 상품 데이터
const products = [
    {
        id: 1,
        name: 'Belt',
        price: 20,
        description: 'A stylish belt for your outfit.'
    },
    {
        id: 2,
        name: 'Strap',
        price: 15,
        description: 'A durable strap for your bag.'
    },
    {
        id: 3,
        name: 'Wrist Wrap',
        price: 10,
        description: 'Comfortable wrist wrap for gym workouts.'
    }
];

// 상품 목록을 반환하는 API 엔드포인트
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 특정 상품을 반환하는 API 엔드포인트
app.get('/api/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});