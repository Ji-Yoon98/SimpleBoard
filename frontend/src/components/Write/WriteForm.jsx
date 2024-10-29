import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LinkBtn, Buttons, TextCount, SubmitBtn } from "Style/Styled";
import useValidation from "hooks/useValidation";
import useReset from "hooks/useReset";
import FileInput from "./FileInput";
import Preview from "./Preview";
import useCreateBoard from "hooks/useCreateBoard";

const WriteForm = () => {
  const [files, setFiles] = useState([]);
  const maxLength = 255;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm();

  // 유효성 검사
  const { handleValidation } = useValidation(trigger, errors);

  // 초기화
  useReset({ title: "", content: "" }, reset);

  // 글 등록
  const { createBoard } = useCreateBoard(files, reset);

  // 이미지 삭제
  const handleDeleteFile = (fileId) => {
    const newFiles = files.filter((file) => file.id !== fileId);
    setFiles(newFiles);
  };

  // 내용 입력 시 카운트 업데이트
  const content = watch("content", ""); // 현재 content 값 가져오기

  const inputCount = content.length; // 입력된 글자 수

  //content 값 업데이트
  const handleChange = (e) => {
    const { value } = e.target;
    setValue("content", value);
  };

  return (
    <form onSubmit={handleSubmit(createBoard)}>
      <label>제목</label>
      <input
        type="text"
        maxLength="20"
        placeholder="20자 이하로 입력하세요."
        {...register("title", {
          required: "제목을 입력해주세요.",
          validate: {
            notOnlyWhitespace: (value) => {
              return value.trim() !== "" || "제목은 공백만 입력할 수 없습니다.";
            },
          },
        })}
      />
      <label>내용</label>
      <textarea
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="255자 이하로 입력하세요."
        {...register("content", {
          required: "내용을 입력해주세요.",
          validate: {
            notOnlyWhitespace: (value) => {
              return value.trim() !== "" || "내용은 공백만 입력할 수 없습니다.";
            },
          },
        })}
      ></textarea>
      <TextCount>{`${inputCount}/${maxLength}자`}</TextCount>
      <FileInput
        register={register}
        files={files}
        setFiles={setFiles}
        accept=".jpg, .jpeg, .png, .gif"
      />
      <hr />
      <Preview files={files} handleDeleteFile={handleDeleteFile} />

      <Buttons>
        <LinkBtn to="/board">목록</LinkBtn>
        <SubmitBtn type="submit" onClick={handleValidation}>
          등록
        </SubmitBtn>
      </Buttons>
    </form>
  );
};

export default WriteForm;
