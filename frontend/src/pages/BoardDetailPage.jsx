import BoardDetail from "components/BoardDetail/BoardDetail";
import React from "react";
import { Container, Title, DetailContent } from "Style/Styled";

const BoardDetailPage = () => {
  return (
    <>
      <Container>
        <DetailContent>
          <Title>상세 보기</Title>
          <BoardDetail />
        </DetailContent>
      </Container>
    </>
  );
};

export default BoardDetailPage;
