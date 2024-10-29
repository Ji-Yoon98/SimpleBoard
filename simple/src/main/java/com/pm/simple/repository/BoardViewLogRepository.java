package com.pm.simple.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pm.simple.entity.Board;
import com.pm.simple.entity.BoardViewLog;
import com.pm.simple.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface BoardViewLogRepository extends JpaRepository<BoardViewLog, Long> {

	boolean existsByBoardAndUserAndViewDate(Board board, User user, LocalDate  viewDate);
	
	@Query("DELETE FROM BoardViewLog b WHERE b.viewDate < :viewDate")
	void deleteByViewDateBefore(@Param("viewDate") LocalDate viewDate);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM BoardViewLog b WHERE b.board.id = :id")
	void deleteByBoardId(@Param("id") Long id);

}
