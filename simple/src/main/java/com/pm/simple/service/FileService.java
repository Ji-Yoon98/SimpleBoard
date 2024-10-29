package com.pm.simple.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pm.simple.dto.FileDTO;
import com.pm.simple.entity.Board;
import com.pm.simple.entity.File;
import com.pm.simple.mapping.FileMapping;
import com.pm.simple.repository.FileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
	
	// 파일 업로드 디렉토리 경로
    @Value("${file.path}")
    private String filepath;
    
    private final FileRepository fileRepository; 
    private final FileMapping fileMapping; 
    
    // 파일 추가
    public List<File> saveFiles(List<MultipartFile> files, Board board) {
    	
    	log.info("파일첨부 서비스 확인");
        List<File> savedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            // 파일이 null 이 아닌지
            if (!file.isEmpty()) {
            	 // 파일 이름에서 불필요한 경로 요소를 제거 (cleanPath C:/uploads/image.jpg -> image.jpg)
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                
                // 파일 경로를 UUID로 생성해서 중복 방지
                String filePath = filepath + UUID.randomUUID().toString() + "_" + fileName;

                try {
                	// 파일 경로
                    Path path = Paths.get(filePath); 
                    
                    // 파일 디렉토리가 존재하지 않으면 생성
                    if (!Files.exists(path)) {
                        Files.createDirectories(path);
                    }
                    
                    // InputStream을 try-with-resources로 사용하여 자동으로 닫기
                    try (var inputStream = file.getInputStream()) {
                    	
                        // 파일을 지정된 경로로 복사
                        Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
                    }
                    
                    // FileDTO 생성 (ID는 null로 설정)
                    FileDTO fileDTO = new FileDTO(null ,fileName, filePath, board.getId());
                    
                    // File 엔티티 생성
                    File fileEntity = fileMapping.toEntity(fileDTO, board); // board 전달
                    
                    // 파일 엔티티 저장
                    File savedFileEntity = fileRepository.save(fileEntity); 
                    
                    savedFiles.add(savedFileEntity);
                    
                    
                } catch (IOException e) {
                	
                    throw new RuntimeException("Could not store file " + fileName, e);
                }
            } 
        }
        return savedFiles;
    }
    
    // 파일 삭제
    public void deleteFile(Long fileId) {
    	log.info("파일 삭제 서비스 확인");
        fileRepository.deleteById(fileId);
    }
    

    
}
