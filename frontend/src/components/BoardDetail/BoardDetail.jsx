import React, { useState } from "react";
import imgicon from "images/imgicon.png";
import {
  WriteBtn,
  Buttons,
  DetailBox,
  Details,
  DeleteButton,
  LinkBtn,
} from "Style/Styled";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useBoardDetail from "hooks/useBoardDetail";
import deleteBoard from "./BoardDelete";
import FileList from "./FileList";

const BoardDetail = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { board } = useBoardDetail();
  const location = useLocation();

  const [pageNumber] = useState(location.state?.pageNumber || 0);
  const [sort] = useState(location.state?.sort || "created_DESC");
  const [keyword] = useState(location.state?.keyword || "");
  const [category] = useState(location.state?.category || "all");
  const [myPostsOnly] = useState(location.state?.myPostsOnly || false);

  if (!board) {
    return <></>;
  }

  const handleDelete = () => {
    deleteBoard(id, navigate);
  };

  const UpdateBtn = () => {
    navigate(`/update/${id}`, {
      state: {
        pageNumber: pageNumber,
        sort: sort,
        keyword: keyword,
        category: category,
        myPostsOnly: myPostsOnly,
      },
    });
  };

  return (
    <>
      <DetailBox>
        <form>
          <label>제목</label>
          <input type="text" value={board.title} disabled />

          <label>내용</label>
          <Details>
            {board.content} <br />
            <FileList files={board.files} apiUrl={apiUrl} />
          </Details>

          <Link to={board.next ? `/board/${board.next}` : "#"} className="next">
            ▲ {board.nextTitle}
          </Link>
          <Link to={board.prev ? `/board/${board.prev}` : "#"} className="prev">
            ▼ {board.prevTitle}
          </Link>

          <Buttons>
            <LinkBtn
              to={`/board?page=${pageNumber}&sort=${sort}&keyword=${keyword}&category=${category}&myPostsOnly=${myPostsOnly}`}
            >
              목록
            </LinkBtn>
            {user && user.username === board.username && (
              <div>
                <WriteBtn type="button" onClick={UpdateBtn}>
                  수정
                </WriteBtn>
                <DeleteButton type="button" onClick={handleDelete}>
                  삭제
                </DeleteButton>
              </div>
            )}
          </Buttons>
        </form>
      </DetailBox>
    </>
  );
};

export default BoardDetail;
