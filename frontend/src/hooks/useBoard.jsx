import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useBoard = () => {
  const [boards, setBoards] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState("created_DESC");
  const [totalPages, setTotalPages] = useState(0);
  const [keywordValue, setKeywordValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState("all");
  const [myPostsOnly, setMyPostsOnly] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const boardList = useCallback(
    async (page, sort, kw, cat, myPosts, username) => {
      try {
        const response = await axios.get(
          `${apiUrl}/board?page=${page}&pageSize=${pageSize}&sort=${sort}&keyword=${kw}&category=${cat}&myPostsOnly=${myPosts}&username=${username}`,
          {
            withCredentials: true,
          }
        );

        setPageNumber(response.data.pageable.pageNumber);
        setBoards(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalElements);
      } catch (error) {
        console.error("Error boardList:", error);
      }
    },
    [apiUrl, pageSize]
  );

  // param 값 읽기
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageParam = parseInt(query.get("page") || "0", 10);
    const sortParam = query.get("sort") || "created_DESC";
    const keywordParam = query.get("keyword") || "";
    const categoryParam = query.get("category") || "all";
    const myPostsOnlyParam = query.get("myPostsOnly") === "true";

    setPageNumber(pageParam);
    setSort(sortParam);
    setKeyword(keywordParam);
    setKeywordValue(keywordParam);
    setCategory(categoryParam);
    setCategoryValue(categoryParam);
    setMyPostsOnly(myPostsOnlyParam);

    boardList(
      pageParam,
      sortParam,
      keywordParam,
      categoryParam,
      myPostsOnlyParam,
      user?.username
    );
  }, [location.search]);

  const updateURL = useCallback(
    (page, sort, kw, cat, myPosts) => {
      navigate(
        `/board?page=${page}&sort=${sort}&keyword=${kw}&category=${cat}&myPostsOnly=${myPosts}`,
        {
          state: {
            pageNumber: page,
            keyword: kw,
            category: cat,
            myPostsOnly: myPosts,
          },
        }
      );
    },
    [navigate]
  );

  // 페이지 바뀌는 거
  const handlePageChange = (newPageNumber) => {
    updateURL(newPageNumber, sort, keyword, category, myPostsOnly);
    boardList(newPageNumber, sort, keyword, category, myPostsOnly);
  };

  // 정렬
  const handleSortChange = (Sorts) => {
    let newSort;
    if (Sorts === "id") {
      const sortOrder = sort === "id_DESC" ? "id_ASC" : "id_DESC";
      newSort = sortOrder;
    } else {
      const sortOrder = sort === `${Sorts}_DESC` ? "ASC" : "DESC";
      newSort = `${Sorts}_${sortOrder}`;
    }
    setSort(newSort);
    updateURL(pageNumber, newSort, keyword, category, myPostsOnly);
    boardList(
      pageNumber,
      newSort,
      keyword,
      category,
      myPostsOnly,
      user?.username
    );
  };

  // 검색 input 변경
  const handleSearchChange = (e) => {
    setKeywordValue(e.target.value);
  };

  // 카테고리 변경
  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  // 검색 버튼 클릭
  const handleSearchClick = () => {
    updateURL(0, sort, keywordValue, categoryValue, myPostsOnly);
  };

  // 내 글 보기
  const handleMyPostsOnlyChange = (e) => {
    const isChecked = e.target.checked;
    updateURL(0, sort, keyword, category, isChecked);
    setMyPostsOnly(isChecked); // 상태 업데이트
    boardList(0, sort, keyword, category, isChecked, user?.username); // 게시물 재조회
  };

  return {
    boards,
    pageNumber,
    pageSize,
    sort,
    totalPages,
    keyword,
    keywordValue,
    category,
    categoryValue,
    totalCount,
    myPostsOnly,
    handlePageChange,
    handleSortChange,
    handleSearchChange,
    handleSearchClick,
    handleCategoryChange,
    handleMyPostsOnlyChange,
  };
};

export default useBoard;
