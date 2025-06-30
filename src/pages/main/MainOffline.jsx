import { useState } from "react";
import MainHeader from "../../components/main/MainHeader";
import MainMap from "../../components/main/MainMap";
import MainTabBar from "../../components/main/MainTabBar";
import MissionCard from "../../components/main/MissionCard";
import styles from "./MainOffline.module.css";

export default function MainOffline() {
  const [toggle, setToggle] = useState(false);
  const [tab, setTab] = useState("미션");

  return (
    <div className={styles.wrapper}>
      <MainHeader
        statusText="배달을 시작해보세요"
        toggleValue={toggle}
        onToggle={() => setToggle((prev) => !prev)}
        onProfileClick={() => alert("프로필 버튼 클릭")}
      />
      <MainMap />
      <div className={styles.bottomSheet}>
        <MainTabBar active={tab} onTabChange={setTab} />
        {tab === "미션" && <MissionCard />}
        {/* 대기주문 탭일 때 다른 컴포넌트 표시 가능 */}
      </div>
    </div>
  );
}
