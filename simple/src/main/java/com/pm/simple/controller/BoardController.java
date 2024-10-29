package com.pm.simple.controller;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pm.simple.dto.BoardDTO;
import com.pm.simple.entity.User;
import com.pm.simple.service.BoardService;
import com.pm.simple.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardController {
	private final UserService userService;
	private final BoardService boardService;
	
	
	// 게시글 목록 조회
	@GetMapping("/board")
	public ResponseEntity<Page<BoardDTO>> getBoards(
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "created_DESC") String sort,
			@RequestParam(name = "keyword", required = false) String keyword, 
			@RequestParam(name = "category", required = false) String category,
	        @RequestParam(name = "myPostsOnly", defaultValue = "false") boolean myPostsOnly)  {

		log.info("게시판 조회 및, 페이징, 검색 컨트롤러 확인");
		
		String username = userService.getUsername();
		
		log.info(username);

		Page<BoardDTO> Boards = boardService.getAllBoardSearch(page, pageSize, sort, keyword, category, myPostsOnly, username);

		return ResponseEntity.ok(Boards);
	}
	
	
	// 게시글 작성
	@PostMapping("/post")
    public ResponseEntity<BoardDTO> createBoard(@RequestPart BoardDTO boardDTO, @RequestPart(value = "files", required = false)  List<MultipartFile> files) {
		// 현재 로그인 유저 정보 받아오기
		String username = userService.getUsername();
        
        User user = userService.findByUsername(username); 
        
        BoardDTO createdBoard = boardService.createBoard(boardDTO, user, files);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }
	
	// 게시글 상세 보기
	@GetMapping("/board/{id}")
    public ResponseEntity<BoardDTO> getBoard(@PathVariable Long id) {
        
		log.info("게시판 상세 컨트롤러 확인");
		
		String username = userService.getUsername();
		
		if(username == null) {
			username = "anonymous";
		}
		
		BoardDTO boardDTO = boardService.findBoardById(id, username);
		
        return ResponseEntity.ok(boardDTO);
    }
	
	// 수정
	@PutMapping("/board/{id}")
	public ResponseEntity<BoardDTO> updateBoard(
	    @PathVariable Long id,
	    @RequestPart BoardDTO boardDTO,
	    @RequestPart(required = false) List<Long> deleteFilesId,
	    @RequestPart(required = false) List<MultipartFile> files) {
		
		log.info("게시판 수정 컨트롤러 확인");
	    
		BoardDTO updatedBoard = boardService.updateBoard(id, boardDTO, deleteFilesId, files);
	    return ResponseEntity.ok(updatedBoard);
	}
	
	// 삭제
	@DeleteMapping("/board/{id}")
	public ResponseEntity deleteBoard(@PathVariable Long id) {
		boardService.deleteBoardById(id);
		
        return ResponseEntity.ok().build();
    }
 

}
