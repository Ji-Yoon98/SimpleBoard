import BoardForm from "components/Board/BoardForm";
import useCheckLogin from "hooks/useCheckLogin";
import React from "react";
import back from "images/back.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  BoardContent,
  Title,
  WriteBtn,
  BoardBackBtnBox,
} from "Style/Styled";

const BoardPage = () => {
  const navigate = useNavigate();
  const isLogin = useCheckLogin(); // 로그인 상태 확인

  const handleClick = () => {
    if (isLogin) {
      navigate("/write");
    } else {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  };

  return (
    <>
      <Container>
        <BoardContent>
          <BoardBackBtnBox>
            <Link to="/">
              <img src={back} alt="뒤로가기 이미지" />
            </Link>
            <Title>게시판</Title>
          </BoardBackBtnBox>
          <BoardForm />
          <WriteBtn onClick={handleClick}>글쓰기</WriteBtn> <br />
        </BoardContent>
      </Container>
    </>
  );
};

export default BoardPage;
