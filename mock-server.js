import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

// 출/퇴근 상태 전환
app.post('/api/rider/working', (req, res) => {
  res.json({
    httpStatus: 200,
    message: '출/퇴근 상태전환 성공',
    data: { isWorking: req.body.isWorking }
  });
});

// 주문 상세 조회
app.get('/api/rider/:orderId/details', (req, res) => {
  const { orderId } = req.params;
  res.json({
    httpStatus: 200,
    message: '주문 상세 조회 성공',
    data: {
      orderId,
      storeName: 'BHC 구름점',
      orderPrice: 18000,
      orderStatus: 'WAITING',
      address: '서울시 강남구 ...',
      menu: [
        { name: '후라이드치킨', quantity: 1 },
        { name: '콜라', quantity: 1 }
      ],
      createdAt: '2024-06-01T12:00:00Z'
    }
  });
});

// 배달 요청 목록
app.get('/api/rider/request', (req, res) => {
  res.json([
    {
      orderId: 123,
      storeName: 'BHC 구름점',
      orderPrice: 18000,
      address: '서울시 강남구 ...',
      orderStatus: 'WAITING',
      distance: 2.5,
      deliveryFee: 6200,
      createdAt: '2024-06-01T12:00:00Z'
    },
    {
      orderId: 124,
      storeName: '김밥천국',
      orderPrice: 9000,
      address: '서울시 강남구 ...',
      orderStatus: 'WAITING',
      distance: 1.2,
      deliveryFee: 5200,
      createdAt: '2024-06-01T12:10:00Z'
    }
  ]);
});

// 기타 엔드포인트도 위와 같이 추가 가능

app.listen(4000, () => {
  console.log('Mock server running on http://localhost:4000');
}); 
