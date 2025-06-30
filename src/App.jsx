import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/Layout";
import Landing from "./pages/members/Landing";
import Login from "./pages/members/Login";
import Register from "./pages/members/Register";
import Map from "./pages/delivery/Map";
import DeliveryStatus from "./pages/delivery/DeliveryStatus";
import MyPage from "./pages/mypage/MyPage";
import Settlement from "./pages/mypage/Settlement";
import Summary from "./pages/mypage/Summary";
import Temp from "./pages/temp/Temp";
import CallIncoming from "./pages/delivery/CallInComing";
import DeliveryPhotoConfirm from "./pages/delivery/DeliveryPhotoConfirm";
import DeliveryComplete from "./pages/delivery/DeliveryComplete";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/delivery" element={<Map />} />
          <Route path="/delivery/:orderId" element={<DeliveryStatus />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/delivery/call-incoming" element={<CallIncoming />} />
          <Route path="/delivery/photo-confirm" element={<DeliveryPhotoConfirm />} />
          <Route path="/delivery/complete" element={<DeliveryComplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
