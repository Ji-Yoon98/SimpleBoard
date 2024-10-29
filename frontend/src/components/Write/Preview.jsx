import React from "react";
import { FileList } from "Style/Styled";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"]; // 이미지 확장자 목록

const Preview = ({ files, handleDeleteFile }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <FileList>
      <ul>
        {files.map((file) => {
          const fileExtension = file.name
            ? file.name.split(".").pop().toLowerCase()
            : null;

          const filePath = file.filePath
            ? file.filePath.split("/").pop()
            : null;
          const imageUrl = filePath
            ? `${apiUrl}/file/${filePath}`
            : fileExtension && ALLOWED_EXTENSIONS.includes(fileExtension)
            ? URL.createObjectURL(file)
            : null; // 이미지 파일이 아닌 경우 URL 생성하지 않음

          return (
            <li key={file.id}>
              <button type="button" onClick={() => handleDeleteFile(file.id)}>
                &times;
              </button>
              {imageUrl ? (
                <img src={imageUrl} alt={file.name || "미리보기"} />
              ) : (
                <span>{file.name}</span> // 이미지가 아닌 경우 파일 이름만 표시
              )}
            </li>
          );
        })}
      </ul>
    </FileList>
  );
};

export default Preview;
