import React from "react";
import { Search, SubmitBtn } from "Style/Styled";

const BoardSearch = ({
  keywordValue,
  categoryValue,
  onSearchChange,
  onSearchClick,
  onCategoryChange,
}) => {
  // 엔터 하면 검색
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <>
      <Search>
        <select value={categoryValue} onChange={onCategoryChange}>
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="name">작성자</option>
          <option value="content">내용</option>
        </select>
        <input
          type="text"
          value={keywordValue.trim()}
          onChange={onSearchChange}
          placeholder="제목, 작성자, 내용으로 검색해주세요"
          onKeyUp={(e) => handleSearchEnter(e)}
        />
        <SubmitBtn onClick={onSearchClick}>검색</SubmitBtn>
      </Search>
    </>
  );
};

export default BoardSearch;
