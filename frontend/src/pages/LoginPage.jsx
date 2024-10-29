import LoginForm from "components/Login/LoginForm";
import React from "react";
import { BackBtnBox, Container, Content, Title } from "Style/Styled";
import back from "images/back.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <Container>
        <BackBtnBox>
          <Link to="/">
            <img src={back} alt="뒤로가기 이미지" />
          </Link>
        </BackBtnBox>
        <Content>
          <Title>Login</Title>
          <LoginForm />
        </Content>
      </Container>
    </>
  );
};

export default LoginPage;
