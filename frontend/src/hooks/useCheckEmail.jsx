import { useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const useEmailCheck = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const checkEmail = async (email) => {
    if (!email || email.includes(" ")) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/isEmail/${email}`);
      const isDuplicate = response.data;

      if (isDuplicate) {
        alert("이미 사용 중인 이메일 입니다.");
        setIsEmailChecked(false); // 중복이 있을 경우 false로 설정
      } else {
        alert("사용 가능한 이메일 입니다.");
        setIsEmailChecked(true); // 중복이 없을 경우 true로 설정
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  return { isEmailChecked, checkEmail, setIsEmailChecked };
};

export default useEmailCheck;
