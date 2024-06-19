// npm install expess mongoose body-parser cors dotenv

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas 연결 URL
const mongoDBUrl = process.env.MONGODB_URL;


const initializeDB = async () => {
  try {
    await CartItem.deleteMany({});
    console.log('장바구니 아이템 초기화 완료');
  } catch (err) {
    console.error('장바구니 아이템 초기화 중 오류 발생:', err);
  }
};

// Mongoose를 사용하여 MongoDB에 연결
mongoose.connect(mongoDBUrl);

const db = mongoose.connection;

db.once('open', () => {
  initializeDB();
  console.log('DB 연결!');
});

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  purchased: { type: Boolean, default: false }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// 장바구니 상품 추가 처리하기
app.post('/add-to-cart', (req, res) => {
  const { name, price, image } = req.body;
  const newItem = new CartItem({ name, price, image });
  newItem.save()
    .then(() => res.send('상품을 장바구니에 담았습니다!'))
    .catch(err => console.error('상품을 장바구니에 추가할 수 없습니다.:', err));
});

// 장바귀 상품 불러오기 
app.get('/get-cart-items', (req, res) => {
  CartItem.find()
    .then(items => res.json(items))
    .catch(err => console.error('장바구니를 불러올 수 없습니다.:', err));
});

// 장바구니 상품 삭제 처리하기
app.delete('/remove-from-cart/:id', (req, res) => {
  const itemId = req.params.id;
  CartItem.findByIdAndDelete(itemId)
    .then(() => res.json({ message: '상품이 장바구니에서 삭제되었습니다!' }))
    .catch(err => console.error('상품을 장바구니에서 삭제할 수 없습니다.:', err));
});

// 구매 요청을 처리하기
app.post('/checkout', (req, res) => {
  CartItem.updateMany({ purchased: false }, { purchased: true })
    .then(() => res.json({ message: '구매가 완료되었습니다!' }))
    .catch(err => console.error('구매를 완료할 수 없습니다.:', err));
});

// 구매한 상품을 불러오기
app.get('/get-purchased-items', (req, res) => {
  CartItem.find({ purchased: true })
    .then(items => res.json(items))
    .catch(err => console.error('구매한 상품을 불러올 수 없습니다.:', err));
});

// 리뷰 추가 요청 처리
app.post('/add-review', (req, res) => {
  const { cartItemId, reviewText, rating } = req.body;
  const newReview = new Review({ cartItemId, reviewText, rating });
  newReview.save()
    .then(() => res.send('리뷰가 추가되었습니다!'))
    .catch(err => console.error('리뷰를 추가할 수 없습니다.:', err));
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
