import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/Layout";
import Landing from "./pages/members/Landing";
import Login from "./pages/members/Login";
import Register from "./pages/members/Register";
import Main from "./pages/main/Main";
import Delivery from "./pages/delivery/Delivery";
import MyPage from "./pages/mypage/MyPage";
import Settlement from "./pages/mypage/Settlement";
import Summary from "./pages/mypage/Summary";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
