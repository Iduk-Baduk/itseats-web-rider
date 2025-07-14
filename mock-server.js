import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// --- Mock JWT 인증 및 memberType 체크 미들웨어 ---
function authRider(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({
      httpStatus: 401,
      message: '인증이 필요합니다.',
      data: null
    });
  }
  // 실제 JWT 파싱 대신, 간단히 memberType=RIDER인 경우만 통과
  // 예: Authorization: Bearer RIDER_TOKEN
  const token = auth.replace('Bearer ', '').trim();
  if (token !== 'RIDER_TOKEN') {
    return res.status(403).json({
      httpStatus: 403,
      message: '권한이 없습니다.',
      data: null
    });
  }
  next();
}

// --- 공통 응답 포맷 함수 ---
function success(message, data) {
  return {
    httpStatus: 200,
    message,
    data
  };
}
function error(httpStatus, message) {
  return {
    httpStatus,
    message,
    data: null
  };
}

// --- 1. 출/퇴근 상태 변경 ---
app.post('/api/rider/working', authRider, (req, res) => {
  const { isWorking } = req.body;
  if (typeof isWorking !== 'boolean') {
    return res.status(400).json(error(400, 'isWorking(boolean) 필드가 필요합니다.'));
  }
  res.json(success('출/퇴근 상태전환 성공', { isWorking }));
});

// --- 2. 배달 거절 ---
app.put('/api/rider/:orderId/reject', authRider, (req, res) => {
  const { orderId } = req.params;
  const { rejectReason } = req.body;
  if (!rejectReason) {
    return res.status(400).json(error(400, 'rejectReason 필드가 필요합니다.'));
  }
  res.json(success('배달 거절 완료', { rejectReason }));
});

// --- 3. 배정받은 주문 상세 조회 ---
app.get('/api/rider/:orderId/details', authRider, (req, res) => {
  const { orderId } = req.params;
  res.json(success('주문 상세 조회 성공', {
    orderId: Number(orderId),
    storeName: 'BHC 구름점',
    orderPrice: 18000,
    orderStatus: 'WAITING',
    address: '서울시 ...',
    menu: [
      { name: '후라이드치킨', quantity: 1 },
      { name: '콜라', quantity: 1 }
    ],
    createdAt: '2024-06-01T12:00:00Z'
  }));
});

// --- 4. 배달 수락 ---
app.put('/api/rider/:orderId/accept', authRider, (req, res) => {
  res.json(success('배달 수락 완료', null));
});

// --- 5. 매장 도착 처리 ---
app.put('/api/rider/:orderId/arrived', authRider, (req, res) => {
  res.json(success('매장 도착 완료', null));
});

// --- 6. 픽업 처리 ---
app.put('/api/rider/:orderId/pickup', authRider, (req, res) => {
  res.json(success('픽업 완료', null));
});

// --- 7. 배달 인증 사진 업로드 ---
import multer from 'multer';
import fs from 'fs';

// uploads 디렉토리가 없으면 생성
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const upload = multer({ dest: 'uploads/' });

app.post('/api/rider/:orderId/picture', authRider, upload.single('image'), (req, res) => {
  console.log('사진 업로드 요청:', req.params.orderId);
  console.log('업로드된 파일:', req.file);
  
  if (!req.file) {
    return res.status(400).json(error(400, '이미지 파일이 필요합니다.'));
  }
  
  // 실제로는 req.file에서 파일 정보 확인
  res.json(success('배달 인증 사진 업로드 성공', {
    imageUrl: 'https://cdn.example.com/photo/' + req.params.orderId + '.jpg'
  }));
});

// --- 8. 배달 완료 처리 ---
app.put('/api/rider/:orderId/done', authRider, (req, res) => {
  res.json(success('배달 완료', null));
});

// --- 9. 배정 대기 주문 목록 조회 ---
app.get('/api/rider/request', authRider, (req, res) => {
  res.json(success('대기 배달 주문 조회 성공', [
    {
      orderId: 123,
      storeName: 'BHC 구름점',
      orderPrice: 18000,
      address: '서울시 ...',
      orderStatus: 'WAITING',
      distance: 2.5,
      deliveryFee: 6200,
      createdAt: '2024-06-01T12:00:00Z'
    },
    {
      orderId: 124,
      storeName: '김밥천국',
      orderPrice: 9000,
      address: '서울시 ...',
      orderStatus: 'WAITING',
      distance: 1.2,
      deliveryFee: 5200,
      createdAt: '2024-06-01T12:10:00Z'
    }
  ]));
});

// --- 공통 에러 처리 (404 등) ---
app.use((req, res) => {
  res.status(404).json(error(404, '존재하지 않는 API 경로입니다.'));
});

app.listen(4000, () => {
  console.log('Mock server running on http://localhost:4000');
}); 
