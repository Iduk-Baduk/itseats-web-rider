import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/delivery/:orderId/complete" element={<CompleteDelivery />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/temp" element={<Temp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
