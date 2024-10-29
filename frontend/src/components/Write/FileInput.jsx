import React from "react";
import { FileBox, FileLable } from "Style/Styled";

const FileInput = ({ register, files, setFiles }) => {
  // 파일 선택 시 미리보기
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
      .map((file) => {
        // 파일 형식 검사
        const allowedTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert(`${file.name}는 허용되지 않는 파일 형식입니다.`);
          return null; // 허용되지 않는 파일은 null로 반환
        }
        // 새로 추가된 파일들은 id값이 없으므로 id값을 만들어줌
        return Object.assign(file, { id: Math.random() });
      })
      .filter(Boolean); // null이 아닌 파일만 필터링

    if (files.length + selectedFiles.length > 5) {
      alert("파일은 총 5개까지만 올릴 수 있습니다.");
      return; // 상태 업데이트를 하지 않음
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <FileBox>
      <FileLable htmlFor="inputFile">파일 선택</FileLable>
      {files.length > 0 && <span>{files.length}개 파일 선택됨</span>}
      <input
        type="file"
        id="inputFile"
        {...register("file")}
        multiple
        onChange={handleFileChange}
      />
    </FileBox>
  );
};

export default FileInput;
