import React from "react";

const FileList = ({ files, apiUrl }) => {
  return (
    <>
      {files.map((file) => {
        const filePath = file.filePath.split("/").pop();
        const imageUrl = `${apiUrl}/file/${filePath}`;

        return <img key={file.filePath} src={imageUrl} alt={file.filename} />;
      })}
    </>
  );
};

export default FileList;
