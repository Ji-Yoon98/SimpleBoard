import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const deleteBoard = (id, navigate) => {
  return new Promise((resolve, reject) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`${apiUrl}/board/${id}`)
        .then((res) => {
          alert("삭제되었습니다.");
          navigate("/board");
          resolve(res);
        })
        .catch((error) => {
          alert("삭제 중 오류가 발생했습니다.");
          reject(error);
        });
    } else {
      alert("삭제가 취소되었습니다.");
    }
  });
};

export default deleteBoard;
