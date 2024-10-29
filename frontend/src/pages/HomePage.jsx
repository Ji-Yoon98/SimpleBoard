import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 94%;
  align-content: center;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: #555;
  font-weight: bold;
  padding: 20px 60px;
  background-color: #fff;
  border: 1px solid #ffd000;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    color: #fff;
    background-color: #ffd000;
    border: 1px solid #fff;
  }
`;

const MainMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 10px;
  }
`;

const HomePage = () => {
  return (
    <>
      <Container>
        <MainMenu>
          <div>
            <Links to="/login">Login</Links> <br />
          </div>

          <div>
            <Links to="/board">Board</Links> <br />
          </div>
        </MainMenu>
      </Container>
    </>
  );
};

export default HomePage;
