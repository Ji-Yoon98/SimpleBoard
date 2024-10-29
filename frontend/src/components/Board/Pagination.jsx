import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Li, Ul } from "Style/Styled";

const Pagination = ({ totalPages, onPageChange, page }) => {
  const [activePage, setActivePage] = useState(1);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pages = parseInt(query.get("page") || "0");

  useEffect(() => {
    setActivePage(pages + 1);
  }, [pages]);

  // totalPages 값에 따라 페이지 번호(1부터 시작) 배열 생성
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const handleClick = (number) => {
    setActivePage(number); // 클릭된 페이지 번호로 활성화 상태 업데이트
    onPageChange(number - 1); // 페이지 번호를 0부터 시작하도록 조정
  };

  // 페이지 그룹 (현재 페이지 그룹의 시작과 끝)
  const itemsPerGroup = 5; // 각 그룹당 페이지 수
  const groupIndex = Math.floor(page / itemsPerGroup); // 현재 페이지 그룹 인덱스
  const startPage = groupIndex * itemsPerGroup; // 그룹의 시작 페이지
  const endPage = Math.min(startPage + itemsPerGroup, totalPages); // 그룹의 끝 페이지

  const handlePreviousGroup = () => {
    if (groupIndex > 0) {
      onPageChange(startPage - itemsPerGroup); // 이전 그룹으로 이동
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(startPage + itemsPerGroup); // 다음 그룹으로 이동
    }
  };

  return (
    <nav>
      <Ul className="pagination">
        <Li>
          <button onClick={handlePreviousGroup} disabled={groupIndex === 0}>
            &lt;
          </button>
        </Li>

        {pageNumbers.slice(startPage, endPage).map((number) => (
          <Li key={number}>
            <button
              onClick={() => handleClick(number)}
              className={activePage === number ? "active" : ""} // 조건부 클래스를 추가
            >
              {number}
            </button>
          </Li>
        ))}

        <Li>
          <button onClick={handleNextGroup} disabled={endPage >= totalPages}>
            &gt;
          </button>
        </Li>
      </Ul>
    </nav>
  );
};

export default Pagination;
