import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  JoinLink,
  SubmitBtn,
} from "Style/Styled";
import useValidation from "hooks/useValidation";
import useReset from "hooks/useReset";
import useCheckLogin from "hooks/useCheckLogin";
import axios from "axios";

const LoginForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const isLoggedIn = useCheckLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  // 유효성 검사
  const { handleValidation } = useValidation(trigger, errors);
  // 초기화
  useReset({ username: "", password: "" }, reset);

  // 로그인 처리 함수
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await axios.post(`${apiUrl}/login`, formData, {
        withCredentials: true, // 세션 쿠키를 전송
      });

      if (response.status === 200) {
        window.location.href = "/board"; // 로그인 성공 시 게시판으로 이동
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그인 체크
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/board");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>아이디</Label>
          <div>
            <Input
              type="text"
              {...register("username", {
                required: "아이디를 입력하세요",
                validate: {
                  notOnlyWhitespace: (value) => {
                    return (
                      value.trim() !== "" ||
                      "아이디는 공백을 입력할 수 없습니다."
                    );
                  },
                },
              })}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력하세요",
              validate: {
                notOnlyWhitespace: (value) => {
                  return (
                    value.trim() !== "" ||
                    "비밀번호는 공백을 입력할 수 없습니다."
                  );
                },
              },
            })}
          />
        </FormGroup>
        <JoinLink to="/join">회원가입</JoinLink> <br />
        <SubmitBtn type="submit" onClick={handleValidation}>
          로그인
        </SubmitBtn>
      </Form>
    </>
  );
};

export default LoginForm;
