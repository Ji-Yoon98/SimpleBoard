import React, { useEffect, useState } from "react";
import axios from "axios";

const useCheckLogin = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(`${apiUrl}/loginCheck`, {
          withCredentials: true,
        });
        setIsLogin(response.data);
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        setIsLogin(false);
      }
    };

    checkLogin();
  }, [apiUrl]);

  return isLogin;
};

export default useCheckLogin;
