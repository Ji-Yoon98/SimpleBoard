import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCreateBoard = (files, reset) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const createBoard = async (data) => {
    const maxRequestSize = 10 * 1024 * 1024; // 전체 요청 크기 제한 10MB

    const formData = new FormData();
    const boardDTO = {
      title: data.title.trim(),
      content: data.content.trim(),
    };

    /* 파일 + 글을 같이 등록하기 위해선 파일은 form-data로, 내용은 json으로 보내야함
     *  ->  boardDTO 객체를 JSON 문자열로 변환하여 변환된 json 문자열을 blob로 생성해서 form에 추가
     * boardDTO = 서버 전송 키, blob = 값
     */
    const json = JSON.stringify(boardDTO);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("boardDTO", blob);

    let totalSize = blob.size;

    // 파일이 있으면 파일도 formData에 추가
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
        formData.append("files", files[i]);
      }
    }

    if (totalSize > maxRequestSize) {
      alert("전체 파일 허용 용량 " + maxRequestSize + "을 초과했습니다.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/post`, formData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        alert("등록되었습니다.");
        reset(); // 성공적으로 등록 후 폼을 초기화
        navigate("/board"); // 게시판 목록 페이지로 이동
      }
    } catch (error) {
      console.error("Error post:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { createBoard };
};

export default useCreateBoard;
