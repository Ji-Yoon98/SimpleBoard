import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useBoardDetail = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`${apiUrl}/board/${id}`, {
          withCredentials: true,
        });
        setBoard(response.data);
      } catch (error) {
        console.error("게시물 로드 실패:", error); // 에러 처리
      }
    };

    fetchBoard();
  }, [id]);

  return { board };
};

export default useBoardDetail;
