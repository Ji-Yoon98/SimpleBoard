import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, SubmitBtn } from "Style/Styled";
import useUserIdCheck from "hooks/useCheckUser";
import useValidation from "hooks/useValidation";
import useResetUserIdCheck from "hooks/useResetUserCheck";
import useCheckLogin from "hooks/useCheckLogin";
import useReset from "hooks/useReset";
import axios from "axios";
import useEmailCheck from "hooks/useCheckEmail";
import useResetEmailCheck from "hooks/useResetEmailCheck";

const JoinForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const isLoggedIn = useCheckLogin();

  const user = {
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
    watch,
    setValue,
  } = useForm();

  // 초기화 (react-hook-form 사용시 초기값이 undefined이기 때문에 초기화)
  useReset(user, reset);

  // 유효성 검사
  const { handleValidation } = useValidation(trigger, errors);

  // 아이디 중복확인
  const { isUserIdChecked, checkUserId, setIsUserIdChecked } = useUserIdCheck();
  const username = watch("username");

  // 중복확인 상태 리셋
  useResetUserIdCheck(username, setIsUserIdChecked);
  const handleCheckUserId = () => {
    const username = getValues("username");
    checkUserId(username);
  };

  // email 중복확인
  const { isEmailChecked, checkEmail, setIsEmailChecked } = useEmailCheck();
  const email = watch("email");
  useResetEmailCheck(email, setIsEmailChecked);
  const handleCheckEmail = () => {
    const email = getValues("email");
    checkEmail(email);
  };

  // 회원가입
  const onSubmit = async (data) => {
    // 중복 확인 여부에 따라 회원가입 진행
    if (isUserIdChecked && isEmailChecked) {
      try {
        const response = await axios.post(`${apiUrl}/join`, data);
        alert(
          "회원가입이 완료되었습니다. 환영합니다 " + response.data.name + "님"
        );

        // 회원가입 완료 -> 로그인으로 이동
        navigate("/login");
      } catch (error) {
        console.error("Error user join:", error.response?.data || error);
      }
    } else {
      if (!isUserIdChecked) {
        alert("아이디 중복확인을 해주세요.");
      } else if (!isEmailChecked) {
        alert("이메일 중복확인을 해주세요.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.keyCode === 32) {
      e.preventDefault(); // 기본 동작 방지
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
              onKeyDown={handleKeyDown}
              {...register("username", {
                required: "아이디를 입력해주세요.",
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
            <Button type="button" onClick={handleCheckUserId}>
              중복확인
            </Button>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            onKeyDown={handleKeyDown}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              validate: {
                notOnlyWhitespace: (value) => {
                  return (
                    value.trim().length > 0 ||
                    "비밀번호는 공백을 입력할 수 없습니다."
                  );
                },
              },
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            onKeyDown={handleKeyDown}
            {...register("passwordCheck", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다.",
              notOnlyWhitespace: (value) => {
                return (
                  value.trim() !== "" ||
                  "비밀번호 확인은 공백을 입력할 수 없습니다."
                );
              },
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            onKeyDown={handleKeyDown}
            {...register("name", {
              required: "이름을 입력해주세요.",
              validate: {
                notOnlyWhitespace: (value) => {
                  return (
                    value.trim() !== "" || "이름은 공백을 입력할 수 없습니다."
                  );
                },
              },
            })}
          />
        </FormGroup>

        <FormGroup>
          <Label>이메일</Label>
          <div>
            <Input
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
                  message: "유효한 이메일 주소가 아닙니다.",
                },
                validate: {
                  notOnlyWhitespace: (value) => {
                    return (
                      value.trim() !== "" ||
                      "이메일은 공백을 입력할 수 없습니다."
                    );
                  },
                },
              })}
              onKeyDown={handleKeyDown}
            />

            <Button type="button" onClick={handleCheckEmail}>
              중복확인
            </Button>
          </div>
        </FormGroup>
        <SubmitBtn type="submit" onClick={handleValidation}>
          가입하기
        </SubmitBtn>
      </Form>
    </>
  );
};

export default JoinForm;
