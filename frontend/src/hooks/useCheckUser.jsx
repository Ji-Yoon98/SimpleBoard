import { useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const useUserIdCheck = () => {
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);

  const checkUserId = async (username) => {
    if (!username || username.includes(" ")) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/isUsername/${username}`);
      const isDuplicate = response.data;

      if (isDuplicate) {
        alert("이미 사용 중인 ID 입니다.");
        setIsUserIdChecked(false); // 중복이 있을 경우 false로 설정
      } else {
        alert("사용 가능한 ID 입니다.");
        setIsUserIdChecked(true); // 중복이 없을 경우 true로 설정
      }
    } catch (error) {
      console.error("Error checking userId:", error);
    }
  };

  return { isUserIdChecked, checkUserId, setIsUserIdChecked };
};

export default useUserIdCheck;
