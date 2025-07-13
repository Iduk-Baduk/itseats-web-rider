import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/api";
import styles from "./DeliveryPhotoConfirm.module.css";

export default function DeliveryPhotoConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, location: riderLocation } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  console.log("사진 확인 - 전달받은 주문 데이터:", order);
  console.log("사진 확인 - 전달받은 위치 데이터:", riderLocation);

  // 뒤로가기
  const handleGoBack = () => {
    navigate("/delivery/in-progress", {
      state: { order, location: riderLocation },
    });
  };

  // 사진 선택/촬영
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 사진 다시 찍기
  const handleRetakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 사진 업로드 및 배달 완료
  const handleCompleteDelivery = async () => {
    if (!order?.orderId) {
      alert("주문 정보가 없습니다.");
      return;
    }

    if (!selectedImage) {
      alert("배달 인증 사진을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // FormData로 사진 업로드
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await apiClient.post(API_ENDPOINTS.UPLOAD_PHOTO(order.orderId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("사진 업로드 성공:", response.data);
      alert("배달 인증 사진이 업로드되었습니다!");

      // 배달 완료 페이지로 이동
      navigate("/delivery/complete", {
        state: {
          order,
          location: riderLocation,
          uploadedImageUrl: response.data.data?.imageUrl,
        },
      });
    } catch (error) {
      console.error("사진 업로드 실패:", error);
      alert("사진 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 주문 데이터가 없을 경우 처리
  if (!order) {
    return (
      <div className={styles.wrapper}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>주문 정보를 찾을 수 없습니다.</h2>
          <p>이전 페이지로 돌아가 주문을 다시 선택해주세요.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      {/* 상단 네비게이션(뒤로가기 등) */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={handleGoBack} aria-label="뒤로가기">
          ←
        </button>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoSelect}
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
      />

      {/* 사진 미리보기 */}
      <div className={styles.photoPreview}>
        {previewUrl ? (
          <img src={previewUrl} alt="배달 인증 사진" className={styles.photoImg} />
        ) : (
          <div
            className={styles.photoPlaceholder}
            onClick={handleRetakePhoto}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              minHeight: "200px",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "48px", marginBottom: "10px" }}>📷</span>
            <span style={{ color: "#666", fontSize: "16px" }}>사진을 선택하세요</span>
          </div>
        )}
      </div>

      {/* 안내문구 */}
      <div className={styles.infoText}>
        인증 사진은 고객님과 운영센터로 전달됩니다.
        <br />
        <small style={{ color: "#666" }}>
          주문#{order.orderId} - {order.storeName}
        </small>
      </div>

      {/* 사진 다시 찍기 버튼 */}
      <button
        className={styles.retakeBtn}
        onClick={handleRetakePhoto}
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.6 : 1 }}
      >
        <span className={styles.retakeIcon}>⟳</span>
        사진 {selectedImage ? "다시 찍기" : "선택/촬영"}
      </button>

      {/* 배달 완료 버튼 */}
      <button
        className={styles.completeBtn}
        onClick={handleCompleteDelivery}
        disabled={isLoading || !selectedImage}
        style={{
          opacity: isLoading || !selectedImage ? 0.6 : 1,
          cursor: isLoading || !selectedImage ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "업로드 중..." : "배달 완료"}
      </button>
    </div>
  );
}
