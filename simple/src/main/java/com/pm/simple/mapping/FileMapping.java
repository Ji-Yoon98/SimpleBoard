package com.pm.simple.mapping;

import org.springframework.stereotype.Component;

import com.pm.simple.dto.FileDTO;
import com.pm.simple.entity.Board;
import com.pm.simple.entity.File;

@Component
public class FileMapping {
	// dto -> entity
	public File toEntity(FileDTO fileDTO, Board board) {
		return File.builder()
				.id(fileDTO.getId())
				.filename(fileDTO.getFilename())
				.filePath(fileDTO.getFilePath())
		        .board(board)
		        .build();		
	}
	
	// entity -> dto
	public FileDTO toDTO(File file) {
		return FileDTO.builder()
				.id(file.getId())
				.filename(file.getFilename())
				.filePath(file.getFilePath())
				.boardId(file.getBoard().getId())
				.build();
	}
}
