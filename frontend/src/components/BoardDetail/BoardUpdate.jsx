import React, { useEffect, useState } from "react";
import {
  WriteBtn,
  Buttons,
  DeleteButton,
  LinkBtn,
  TextCount,
} from "Style/Styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBoardDetail from "hooks/useBoardDetail";
import { useForm } from "react-hook-form";
import FileInput from "components/Write/FileInput";
import Preview from "components/Write/Preview";
import deleteBoard from "./BoardDelete";
import useUpdateBoard from "hooks/useUpdateBoard";
import useValidation from "hooks/useValidation";

const BoardUpdate = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const { board } = useBoardDetail();
  const maxLength = 255;
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  // 유효성 검사
  const { handleValidation } = useValidation(trigger, errors);

  // 파일리스트
  const [files, setFiles] = useState([]);

  // 삭제 파일 리스트
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  // 글 수정
  const updateBoard = useUpdateBoard(
    id,
    apiUrl,
    files,
    deletedFileIds,
    reset,
    navigate
  );

  useEffect(() => {
    if (board) {
      setFiles(board.files);
      reset({
        title: board.title,
        content: board.content,
      });
    }
  }, [board, reset]);

  if (!board) {
    return <p>Loading...</p>;
  }

  // 수정 완료
  const onSubmit = async (data) => {
    await updateBoard(data);
  };

  // 이미지 파일 삭제
  const handleDeleteFile = (fileId) => {
    const newFiles = files.filter((file) => file.id !== fileId);
    setFiles(newFiles);

    // 삭제할 이미지 파일 id값 넣어주기
    setDeletedFileIds((prev) => [...prev, fileId]);
  };

  // 삭제
  const handleDelete = () => {
    deleteBoard(id, navigate);
  };

  // 내용 입력 시 카운트 업데이트
  const content = watch("content", ""); // 현재 content 값 가져오기

  const inputCount = content.length; // 입력된 글자 수

  //content 값 업데이트
  const handleChange = (e) => {
    const { value } = e.target;
    setValue("content", value);
  };

  const pageNumber = location.state?.pageNumber; // 현재 페이지
  const sort = location.state?.sort;
  const keyword = location.state?.keyword; // 검색어
  const myPostsOnly = location.state?.myPostsOnly;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>제목</label>
      <input
        type="text"
        defaultValue={board.title}
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
        defaultValue={board.content}
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
        <LinkBtn
          to={`/board?page=${pageNumber}&{sort}=${sort}&keyword=${keyword}&myPostsOnly=${myPostsOnly}`}
        >
          목록
        </LinkBtn>
        <div>
          <WriteBtn type="submit" onClick={handleValidation}>
            수정완료
          </WriteBtn>
          <DeleteButton type="button" onClick={handleDelete}>
            삭제
          </DeleteButton>
        </div>
      </Buttons>
    </form>
  );
};

export default BoardUpdate;
