import BoardUpdate from "components/BoardDetail/BoardUpdate";
import React from "react";
import { Container, WriteContent, Title } from "Style/Styled";

const BoardUpdatePage = () => {
  return (
    <>
      <Container>
        <WriteContent>
          <Title>수정</Title>
          <BoardUpdate />
        </WriteContent>
      </Container>
    </>
  );
};

export default BoardUpdatePage;
