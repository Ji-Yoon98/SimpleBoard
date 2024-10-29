import React from "react";
import useBoard from "hooks/useBoard";
import BoardTable from "./BoardTable";
import Pagination from "./Pagination";
import BoardSearch from "./BoardSearch";

const BoardForm = () => {
  const {
    boards,
    pageSize,
    pageNumber,
    sort,
    keyword,
    keywordValue,
    category,
    categoryValue,
    totalPages,
    totalCount,
    myPostsOnly,
    handlePageChange,
    handleSortChange,
    handleSearchChange,
    handleSearchClick,
    handleCategoryChange,
    handleMyPostsOnlyChange,
  } = useBoard();

  return (
    <>
      <BoardSearch
        keywordValue={keywordValue}
        categoryValue={categoryValue}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        onCategoryChange={handleCategoryChange}
      />
      <BoardTable
        boards={boards}
        pageSize={pageSize}
        pageNumber={pageNumber}
        sort={sort}
        totalPages={totalPages}
        keyword={keyword}
        category={category}
        totalCount={totalCount}
        myPostsOnly={myPostsOnly}
        onMyPostsOnlyChange={handleMyPostsOnlyChange}
        onSortChange={handleSortChange}
      />
      <Pagination
        pageSize={pageSize}
        totalPages={totalPages}
        page={pageNumber}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default BoardForm;
