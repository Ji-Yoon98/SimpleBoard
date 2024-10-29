package com.pm.simple.mapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.pm.simple.dto.BoardDTO;
import com.pm.simple.dto.FileDTO;
import com.pm.simple.entity.Board;
import com.pm.simple.entity.File;
import com.pm.simple.entity.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class BoardMapping {
	
	private final FileMapping fileMapping;
	
	// dto -> entity
	public Board toEntity(BoardDTO boardDTO, User user) {
		
		List<File> files = new ArrayList<>();

		if (boardDTO.getFiles() != null) {
			for (FileDTO fileDTO : boardDTO.getFiles()) {
				// Board는 null (게시글 생성 후 설정)
				files.add(fileMapping.toEntity(fileDTO, null)); 
			}
		}
		
		return Board.builder()
				.id(boardDTO.getId())
				.title(boardDTO.getTitle())
		        .user(user)
		        .created(LocalDateTime.now())
		        .content(boardDTO.getContent())
		        .viewCount(boardDTO.getViewCount())
		        .files(files)
		        .build();		
	}
	
	
	
	// entity -> dto
	public BoardDTO toDTO(Board board) {
		List<FileDTO> fileDTOs = new ArrayList<>();
        if (board.getFiles() != null) {
            for (File file : board.getFiles()) {
                fileDTOs.add(fileMapping.toDTO(file)); // File -> FileDTO 매핑
            }
        }

		return BoardDTO.builder()
				.id(board.getId())
				.title(board.getTitle())
				.username(board.getUser().getUsername())
				.name(board.getUser().getName())
				.email(board.getUser().getEmail())
				.created(board.getCreated())
				.content(board.getContent())
				.viewCount(board.getViewCount())
				.files(fileDTOs)
				.build();
	}
}
