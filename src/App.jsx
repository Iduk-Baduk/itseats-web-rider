import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Layout from "./layouts/Layout";
import Landing from "./pages/members/Landing";
import Login from "./pages/members/Login";
import Register from "./pages/members/Register";
import Map from "./pages/delivery/Map";
import DeliveryStatus from "./pages/delivery/DeliveryStatus";
import CompleteDelivery from "./pages/delivery/CompleteDelivery";
import MyPage from "./pages/mypage/MyPage";
import Settlement from "./pages/mypage/Settlement";
import Summary from "./pages/mypage/Summary";
import Temp from "./pages/temp/Temp";
import CallIncoming from "./pages/delivery/CallInComing";
import MainOffline from './pages/main/MainOffline';
import MainOnline from "./pages/main/MainOnline";
import GoToStore from "./pages/delivery/GoToStore";
import Pickup from "./pages/delivery/Pickup";
import DeliveryInProgress from "./pages/delivery/DeliveryInProgress";

// 온라인/오프라인 상태를 관리하는 컴포넌트
function MainWrapper() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);

  // 상태 변경 시 페이지 전환
  useEffect(() => {
    navigate(isOnline ? '/main/online' : '/main/offline');
  }, [isOnline, navigate]);

  // 토글 핸들러
  const handleToggle = () => {
    setIsOnline(prev => !prev);
  };

  return isOnline ? (
    <MainOnline onToggle={handleToggle} initialToggle={isOnline} />
  ) : (
    <MainOffline onToggle={handleToggle} initialToggle={isOnline} />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/delivery" element={<Map />} />
          <Route path="/main/*" element={<MainWrapper />} />
          <Route path="/delivery/:orderId" element={<DeliveryStatus />} />
          <Route path="/delivery/:orderId/complete" element={<CompleteDelivery />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/delivery/call-incoming" element={<CallIncoming />} />
          <Route path="/delivery/go-to-store" element={<GoToStore />} />
          <Route path="/delivery/pickup" element={<Pickup />} />
          <Route path="/delivery/in-progress" element={<DeliveryInProgress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
