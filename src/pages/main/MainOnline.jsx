import { useState } from "react";
import MainHeader from "../../components/main/MainHeader";
import MainMap from "../../components/main/MainMap";
import MainTabBar from "../../components/main/MainTabBar";
import MissionCard from "../../components/main/MissionCard";
import styles from "./MainOnline.module.css";

export default function MainOnline() {
  const [toggle, setToggle] = useState(true);
  const [tab, setTab] = useState("미션");

  return (
    <div className={styles.wrapper}>
      {/* 상단 헤더 */}
      <MainHeader
        statusText="가까운 주문을 찾는 중"
        toggleValue={toggle}
        onToggle={() => setToggle((prev) => !prev)}
        onProfileClick={() => alert("프로필 버튼 클릭")}
        backgroundColor="#178351"   // 초록색
        color="#fff"                // 흰색 글씨
      />

      {/* 지도 영역 */}
      <MainMap />

      {/* 하단 시트 */}
      <div className={styles.bottomSheet}>
        <MainTabBar active={tab} onTabChange={setTab} />
        {tab === "미션" && (
          <MissionCard
            count={400}
            badgeText="남음"
            title="400건 배달"
            period="8.31까지"
            reward="15만원"
            maxReward="완료시 최대 50만원"
          />
        )}
        {/* 대기주문 탭일 때 다른 내용 */}
      </div>
    </div>
  );
}
