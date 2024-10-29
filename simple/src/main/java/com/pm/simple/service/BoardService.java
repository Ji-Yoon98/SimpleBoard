package com.pm.simple.service;

import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pm.simple.dto.BoardDTO;
import com.pm.simple.entity.Board;
import com.pm.simple.entity.BoardViewLog;
import com.pm.simple.entity.File;
import com.pm.simple.entity.User;

import com.pm.simple.mapping.BoardMapping;
import com.pm.simple.repository.BoardRepository;
import com.pm.simple.repository.BoardViewLogRepository;
import com.pm.simple.repository.UserRepository;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;
	private final BoardMapping boardMapping;
	private final FileService fileService;
	private final UserRepository userRepository;
	private final BoardViewLogRepository boardViewLogRepository;

	// 게시판 목록 조회, 페이징, 검색
	@Transactional
	public Page<BoardDTO> getAllBoardSearch(int page, int pageSize, String sort, String keyword, String category, boolean myPostsOnly, String username) {

		log.info("게시판 목록 service");
		
		// Sort를 분리 -> 속성, 정렬순 설정
		String[] sortParams = sort.split("_");
	    Sort.Direction direction = Sort.Direction.fromString(sortParams[1]);
	    
	    // Pageable 생성
	    Pageable pageable = PageRequest.of(page, pageSize, Sort.by(direction, sortParams[0]));

		// 페이지 조회
		Page<Board> boardPage = boardRepository.BoardBySearch(keyword, category, myPostsOnly, username, pageable);

		// dto로 보내기
		return boardPage.map(boardMapping::toDTO);
	}
	
	// 게시글 작성
	@Transactional
	public BoardDTO createBoard(BoardDTO boardDTO, User user, List<MultipartFile> files) {
		log.info("게시글 작성 service");
		
        Board board = boardMapping.toEntity(boardDTO, user);
        Board savedBoard = boardRepository.save(board);
        
        // 파일이 있으면
        if(files != null && !files.isEmpty()) {
        	List<File> savedFiles = fileService.saveFiles(files, savedBoard);
        	
        	savedBoard.getFiles().addAll(savedFiles);
        }
        
        
        return boardMapping.toDTO(savedBoard);
    }
	
	// 게시글 상세 조회
	@Transactional
    public BoardDTO findBoardById(Long id, String username){
    	log.info("게시글 조회 service");
    	
    	Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다.")); 
    	
    	User user = userRepository.findByUsername(username);
    	
    	// 오늘을 기준으로 게시글을 조회했는지 확인
    	LocalDate today = LocalDate.now();
    	
    	// 조회수 증가 로직
    	boolean hasViewed = boardViewLogRepository.existsByBoardAndUserAndViewDate(board, user, today);
    	
    	// 게시글 작성자가 현재 사용자X , 오늘 해당 게시글을 조회한 적이 없는 경우 조회수 증가
        if (!board.getUser().getUsername().equals(username) && !hasViewed) {
            board.viewCount();
            boardViewLogRepository.save(new BoardViewLog(null, board, user, today));
        }
        
        
        // 상세페이지 이전, 다음
        Map<String, Object> post = boardRepository.findPreviousAndNextById(id);
        
        BoardDTO boardDTO = boardMapping.toDTO(board);
        
        boardDTO.setPrev((Long) post.get("prev"));
        boardDTO.setPrevTitle((String) post.get("prevTitle"));
        boardDTO.setNext((Long) post.get("next"));
        boardDTO.setNextTitle((String) post.get("nextTitle"));
        
        return boardDTO;
    }
	
    
    // 게시글 수정
    @Transactional
    public BoardDTO updateBoard(Long id, BoardDTO boardDTO, List<Long> deleteFilesId, List<MultipartFile> files) {
        log.info("게시글 수정 service");

        // 기존 게시글 조회
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        // 게시글 업데이트
        Board savedBoard = boardRepository.save(board);
        
        List<File> savedFiles = null;
        

        // 넘어온 파일 아이디 값으로 파일 삭제
        if (deleteFilesId != null && !deleteFilesId.isEmpty()) {
            for (Long fileId : deleteFilesId) {
                fileService.deleteFile(fileId);
            }
        }
        
        // 파일 처리
        if (files != null && !files.isEmpty()) {
	        savedFiles = fileService.saveFiles(files, savedBoard);
        }
        
        board.update(boardDTO.getTitle(), boardDTO.getContent(), savedFiles, LocalDateTime.now());

        return boardMapping.toDTO(savedBoard);
    }
    
    // 게시글 삭제
    @Transactional
    public void deleteBoardById(Long id) {
    	
        boardViewLogRepository.deleteByBoardId(id);
    	
        boardRepository.deleteById(id);
    }
    
    // 스케줄러
    @Transactional
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void deleteViewLogs() {
    	log.info("오래된 조회 로그 삭제");
    	
        LocalDate yesterday = LocalDate.now().minusDays(1);
        boardViewLogRepository.deleteByViewDateBefore(yesterday);
    }
    
    
}
