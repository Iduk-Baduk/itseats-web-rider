# ITSeats Web Rider

음식 배달 서비스 라이더용 웹 애플리케이션

## 주요 기능

- 🚚 실시간 주문 접수 및 관리
- 📍 GPS 기반 위치 추적
- 🗺️ Kakao Maps 연동 실시간 네비게이션
- 📱 모바일 최적화 반응형 디자인
- 🎯 드래그 가능한 Bottom Sheet UI
- 🔄 실시간 배달 상태 업데이트

## 기술 스택

- **Frontend**: React 18, Vite
- **Styling**: CSS Modules
- **Maps**: Kakao Maps API (react-kakao-maps-sdk)
- **State Management**: React Hooks, Context API
- **Location**: Geolocation API
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Kakao Maps API 설정
VITE_KAKAO_APP_KEY=your_kakao_app_key_here

# API 설정
VITE_API_BASE_URL=http://localhost:8080

# Mock Mode (개발 환경에서 사용)
VITE_MOCK_MODE=false
```

**주의사항:**

- `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다
- 프로덕션 환경에서는 실제 API 키를 사용하세요
- Kakao Developers에서 Web 플랫폼 도메인을 등록해야 합니다

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── basic/          # 기본 UI 컴포넌트 (Button, Input 등)
│   ├── common/         # 공통 컴포넌트 (Header, Map 등)
│   ├── delivery/       # 배달 관련 컴포넌트
│   └── main/           # 메인 페이지 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── delivery/       # 배달 플로우 페이지들
│   ├── main/           # 메인 대시보드
│   ├── members/        # 회원 관리
│   └── mypage/         # 마이페이지
├── services/           # API 서비스
├── hooks/              # 커스텀 훅
├── config/             # 설정 파일
├── utils/              # 유틸리티 함수
└── layouts/            # 레이아웃 컴포넌트
```

## 주요 기능

### 배달 플로우

1. **주문 접수** (`CallIncoming`): 새로운 주문 알림 및 수락/거절
2. **매장 이동** (`GoToStore`): 매장까지의 경로 안내
3. **픽업 처리** (`Pickup`): 매장에서 음식 픽업 완료
4. **배달 진행** (`DeliveryInProgress`): 고객 위치까지 배달
5. **배달 완료** (`DeliveryComplete`): 사진 촬영 및 완료 처리

### 지도 시스템

- **실시간 위치 추적**: GPS 기반 라이더 위치 업데이트
- **다중 마커 표시**: 라이더, 매장, 고객 위치 구분 표시
- **경로선 시각화**: 목적지까지의 경로를 색상별로 구분
- **반응형 지도**: 모바일 환경에 최적화된 지도 인터페이스

### UI/UX 특징

- **Draggable Bottom Sheet**: 터치 제스처로 조작 가능한 하단 시트
- **동적 뷰포트**: `100dvh` 활용한 모바일 웹 최적화
- **터치 최적화**: 모바일 터치 인터랙션에 특화된 UI

### 위치 기반 서비스

- **실시간 GPS 추적**: `navigator.geolocation.watchPosition()` 활용
- **거리 계산**: 목적지까지의 실시간 거리 계산
- **100미터 최적화**: 100m 이내 이동 시 업데이트 건너뛰어 배터리 절약
- **위치 정확도 관리**: 배터리 최적화와 정확도 균형
- **백그라운드 추적**: 앱 최소화 시에도 위치 추적 유지

### 성능 최적화

- **메모이제이션**: React.memo, useMemo를 통한 리렌더링 최적화
- **거리 기반 업데이트**: 100m 이상 이동 시에만 위치 업데이트로 배터리 절약

## 라이선스

MIT License+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
