# 배달 라이더 앱 MVC 개발 가이드

## 우선순위별 개발 태스크

### 1. 인증/회원 관리 (최우선)
**담당 파일**: `Login.jsx`, `Register.jsx`

**우선순위 이유**:
- 앱 진입점
- 상태 관리가 단순
- API 연동이 명확

**구현 내용**:
```javascript
// Model
- 로그인/회원가입 API 연동
- 토큰 관리
- 사용자 정보 저장

// View (이미 구현됨)
- 로그인 폼
- 회원가입 폼
- 에러 메시지 표시

// Controller
- 폼 유효성 검사
- API 호출 처리
- 라우팅 처리
```

### 2. 온라인/오프라인 상태 관리 (높음)
**담당 파일**: `MainWrapper.jsx`, `MainOnline.jsx`, `MainOffline.jsx`

**우선순위 이유**:
- 라이더 상태 관리의 핵심
- 실시간 상태 반영 필요

**구현 내용**:
```javascript
// Model
- 라이더 상태 API 연동
- 위치 정보 관리
- 실시간 상태 업데이트

// View (이미 구현됨)
- 온라인/오프라인 토글
- 상태별 화면 표시

// Controller
- 상태 변경 처리
- 위치 업데이트 처리
- 실시간 데이터 동기화
```

### 3. 배달 진행 상태 관리 (높음)
**담당 파일**: `DeliveryStatus.jsx`, `DeliveryInProgress.jsx`, `DeliveryPhotoConfirm.jsx`

**우선순위 이유**:
- 핵심 비즈니스 로직
- 상태 전이가 명확

**구현 내용**:
```javascript
// Model
- 배달 상태 API 연동
- 배달 정보 관리
- 사진 업로드 처리

// View (이미 구현됨)
- 배달 진행 상태 표시
- 사진 촬영/업로드 UI
- 완료 확인 화면

// Controller
- 상태 변경 처리
- 사진 업로드 처리
- 배달 완료 처리
```

### 4. 정산/실적 관리 (중간)
**담당 파일**: `Settlement.jsx`, `Summary.jsx`

**우선순위 이유**:
- 데이터 표시 위주
- 상태 관리 단순

**구현 내용**:
```javascript
// Model
- 정산 정보 API 연동
- 실적 데이터 관리
- 필터링/정렬 로직

// View (이미 구현됨)
- 정산 내역 표시
- 실적 요약 화면
- 필터/정렬 UI

// Controller
- 데이터 필터링
- 정렬 처리
- 페이지네이션
```

## 개발 접근 방식

### 1. 단계별 구현
```
1일차: Model 구현 (API 연동)
2일차: Controller 구현 (상태 관리)
3일차: View 연동 및 테스트
```

### 2. 코드 구조
```
src/
  models/
    - AuthModel.js
    - RiderModel.js
    - DeliveryModel.js
  controllers/
    - AuthController.js
    - RiderController.js
    - DeliveryController.js
  views/ (기존 components 폴더 활용)
```

### 3. 우선순위 기준
- 사용자 진입점 (인증)
- 핵심 비즈니스 로직 (배달)
- 부가 기능 (정산/실적)

## 예상 개발 기간
- 기본 기능 MVC 패턴 적용: 약 2주
- 세부 일정:
  - 인증/회원 관리: 3일
  - 온라인/오프라인 상태 관리: 4일
  - 배달 진행 상태 관리: 4일
  - 정산/실적 관리: 3일

## 개발 시 주의사항
1. API 응답 구조 일관성 유지
2. 상태 관리 로직 Model과 Controller에 명확히 분리
3. View는 최대한 순수 함수 컴포넌트로 유지
4. 실시간 데이터 동기화 고려
5. 에러 처리 및 예외 상황 고려 
