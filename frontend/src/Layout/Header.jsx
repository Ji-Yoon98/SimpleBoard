import React from "react";
import axios from "axios";
import useCheckLogin from "hooks/useCheckLogin";
import { LoginOut } from "Style/Styled";
import logout from "images/logout.png";

const Header = () => {
  const isLoggedIn = useCheckLogin(); // 로그인 상태를 확인

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      alert("로그아웃 완료");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <LoginOut>
      {isLoggedIn && (
        <button onClick={handleLogout}>
          <img src={logout} alt="로그아웃 이미지" />
        </button>
      )}
    </LoginOut>
  );
};

export default Header;
