import WriteForm from "components/Write/WriteForm";
import React from "react";
import { Container, WriteContent, Title } from "Style/Styled";

const WritePage = () => {
  return (
    <>
      <Container>
        <WriteContent>
          <Title>글쓰기</Title>
          <WriteForm />
        </WriteContent>
      </Container>
    </>
  );
};

export default WritePage;
