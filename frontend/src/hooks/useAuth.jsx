import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const response = await axios.get("/loginOk", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다:", error);
        setUser(null);
      }
    };

    UserInfo();
  }, []);

  return { user };
};

export default useAuth;
