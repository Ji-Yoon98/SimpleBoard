package com.pm.simple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pm.simple.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	// 작성자, 제목으로 검색 및 페이징
	@Query("SELECT b FROM Board b WHERE " +
		    "((:category = 'all' AND (b.user.name LIKE %:keyword% OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%)) " +
		    "OR (:category = 'title' AND b.title LIKE %:keyword%) " +
		    "OR (:category = 'name' AND b.user.name LIKE %:keyword%) " +
		    "OR (:category = 'content' AND b.content LIKE %:keyword%)) " +
		    "AND (:myPostsOnly = false OR b.user.username = :username)")
		Page<Board> BoardBySearch(@Param("keyword") String keyword, @Param("category") String category,
		                          @Param("myPostsOnly") boolean myPostsOnly, @Param("username") String username,
		                          Pageable pageable);


	@Query("UPDATE Board b SET b.viewCount = b.viewCount + 1 WHERE b.id = :id")
	void incrementViewCount(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM (SELECT BOARD_ID, TITLE, CONTENT, CREATED, USER_ID, VIEW_COUNT, " +
	        "LAG(BOARD_ID, 1, NULL) OVER (ORDER BY CREATED ASC) AS PREV, " +
	        "LAG(TITLE, 1, '이전글이 없습니다.') OVER (ORDER BY CREATED ASC) AS PREVTITLE, " +
	        "LEAD(BOARD_ID, 1, NULL) OVER (ORDER BY CREATED ASC) AS NEXT, " +
	        "LEAD(TITLE, 1, '다음글이 없습니다') OVER (ORDER BY CREATED ASC) AS NEXTTITLE " +
	        "FROM BOARD) AS board_list " +
	        "WHERE BOARD_ID = :id", nativeQuery = true)
	Map<String, Object> findPreviousAndNextById(@Param("id") Long id);
}
