import React from "react";
import Modal from "react-modal";
import { CloseButton, Title, UserInfo } from "Style/Styled";

Modal.setAppElement("#root");

const UserModal = ({ isModalOpen, onRequestClose, children, userInfo }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true} // 오버레이 클릭 시 모달 닫기
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          border: "5px solid #ffd000",
          borderRadius: "10px",
          padding: "20px",
          width: "400px",
        },
      }}
    >
      <CloseButton onClick={onRequestClose} className="close-button">
        &times;
      </CloseButton>
      <Title>회원정보</Title>
      {userInfo ? (
        <UserInfo>
          <p>아이디: {userInfo.username}</p>
          <p>이메일: {userInfo.email}</p>
          <p>이름: {userInfo.name}</p>
        </UserInfo>
      ) : (
        <p>회원 정보를 불러오는 중...</p>
      )}
      {children}
    </Modal>
  );
};

export default UserModal;
