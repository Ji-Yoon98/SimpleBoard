import JoinForm from "components/Join/JoinForm";
import React from "react";
import { Link } from "react-router-dom";
import back from "images/back.png";
import { BackBtnBox, Container, Content, Title } from "Style/Styled";

const JoinPage = () => {
  return (
    <>
      <Container>
        <BackBtnBox>
          <Link to="/">
            <img src={back} alt="뒤로가기 이미지" />
          </Link>
        </BackBtnBox>
        <Content>
          <Title>회원가입</Title>
          <JoinForm />
        </Content>
      </Container>
    </>
  );
};

export default JoinPage;
