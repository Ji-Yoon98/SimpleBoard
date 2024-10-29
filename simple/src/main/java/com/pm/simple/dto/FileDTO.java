package com.pm.simple.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FileDTO {

    Long id;

    String filename;
    
    String filePath;
    
    Long boardId;
    
    @Builder
    public FileDTO(Long id, String filename, String filePath, Long boardId) {
    	this.id = id;
        this.filename = filename;
        this.filePath = filePath;
        this.boardId = boardId;
    }
}