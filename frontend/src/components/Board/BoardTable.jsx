import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgicon from "images/imgicon.png";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TbodyRow,
  TotalCount,
  TableCellTitle,
  TableTop,
  ArrayBtn,
} from "Style/Styled";
import UserModal from "./UserModal";
import useCheckLogin from "hooks/useCheckLogin";

const BoardTable = ({
  boards,
  pageSize,
  pageNumber,
  sort,
  keyword,
  category,
  totalCount,
  myPostsOnly,
  onMyPostsOnlyChange,
  onSortChange,
}) => {
  // 회원 정보 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 작성자 정보 담기
  const [userInfo, setUserInfo] = useState(null);

  // 작성자 정보 모달 열기
  const openModal = (username, name, email) => {
    setUserInfo({ username, name, email });
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setUserInfo(null);
  };

  const navigate = useNavigate();

  const handleTitleClick = (id) => {
    navigate(`/board/${id}`, {
      state: {
        pageNumber: pageNumber,
        sort: sort,
        keyword: keyword,
        category: category,
        myPostsOnly: myPostsOnly,
      },
    });
  };

  // 게시물 번호 계산
  const getPostNumber = (index) => {
    return sort.includes("id_DESC")
      ? pageNumber * pageSize + index + 1
      : totalCount - (pageNumber * pageSize + index);
  };

  return (
    <>
      <TableTop>
        <TotalCount>총 게시물 수: {totalCount} 개</TotalCount>
        <label>
          <input
            type="checkbox"
            checked={myPostsOnly}
            onChange={(e) => {
              onMyPostsOnlyChange(e);
            }}
            disabled={!useCheckLogin()}
          />{" "}
          내 글만 보기
        </label>
      </TableTop>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              번호{" "}
              <ArrayBtn onClick={() => onSortChange("id")}>
                {sort === "id_DESC" ? "▼" : "▲"}
              </ArrayBtn>
            </TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>
              작성일{" "}
              <ArrayBtn onClick={() => onSortChange("created")}>
                {sort === "created_DESC" ? "▼" : "▲"}
              </ArrayBtn>
            </TableCell>
            <TableCell>
              조회수{" "}
              <ArrayBtn onClick={() => onSortChange("viewCount")}>
                {sort === "viewCount_DESC" ? "▼" : "▲"}
              </ArrayBtn>
            </TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {boards && boards.length > 0 ? (
            boards.map((board, index) => (
              <TbodyRow key={board.id}>
                <TableCell>{getPostNumber(index)}</TableCell>
                <TableCellTitle
                  onClick={() => handleTitleClick(board.id)}
                  style={{ cursor: "pointer" }}
                >
                  {board.title}{" "}
                  {board.files && board.files.length > 0 && (
                    <img src={imgicon} alt="첨부파일" />
                  )}
                </TableCellTitle>
                <TableCell
                  className="users"
                  onClick={() =>
                    openModal(board.username, board.name, board.email)
                  }
                >
                  {board.name}
                </TableCell>
                <TableCell>{board.created}</TableCell>
                <TableCell>{board.viewCount}</TableCell>
              </TbodyRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>게시물이 없습니다.</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      <UserModal
        isModalOpen={isModalOpen}
        onRequestClose={closeModal}
        userInfo={userInfo}
      />
    </>
  );
};

export default BoardTable;
