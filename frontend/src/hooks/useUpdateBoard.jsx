import axios from "axios";
import { useLocation } from "react-router-dom";

const useUpdateBoard = (id, apiUrl, files, deletedFileIds, reset, navigate) => {
  const location = useLocation();

  const pageNumber = location.state?.pageNumber; // 현재 페이지
  const sort = location.state?.sort;
  const keyword = location.state?.keyword; // 검색어
  const myPostsOnly = location.state?.myPostsOnly;

  const updateBoard = async (data) => {
    const maxRequestSize = 10 * 1024 * 1024;
    const formData = new FormData();
    const boardDTO = {
      title: data.title.trim(),
      content: data.content.trim(),
    };

    const json = JSON.stringify(boardDTO);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("boardDTO", blob);

    let totalSize = blob.size;

    if (deletedFileIds.length) {
      const deleteIdsJson = JSON.stringify(deletedFileIds);
      const deleteIdsBlob = new Blob([deleteIdsJson], {
        type: "application/json",
      });
      formData.append("deleteFilesId", deleteIdsBlob);
    }

    if (files.length > 5) {
      alert("파일은 5개 까지만 올릴 수 있습니다.");

      return;
    }

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
      formData.append("files", files[i]);
    }

    if (totalSize > maxRequestSize) {
      alert("전체 파일 허용 용량 " + maxRequestSize + "을 초과했습니다.");
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/board/${id}`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("수정되었습니다.");
        navigate(`/board/${id}`, {
          state: {
            pageNumber: pageNumber,
            sort: sort,
            keyword: keyword,
            myPostsOnly: myPostsOnly,
          },
        });
      }
    } catch (error) {
      console.error("Error update:", error);
      alert("게시글 수정 실패.. 다시 시도해주세요.");
    }
  };

  return updateBoard;
};

export default useUpdateBoard;
