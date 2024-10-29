package com.pm.simple.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardDTO {

	Long id;

	String title;

	String username;
	
	String name;
	
	String email;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	LocalDateTime created;
	
	String content;
	
	int viewCount;
	
	List<FileDTO> files;
	
	Long prev;
	Long next;
	String prevTitle;
	String nextTitle;

	@Builder
	public BoardDTO(Long id, String title, String username, String name, String email, LocalDateTime created, String content, int viewCount, List<FileDTO> files, Long prev, Long next ,String prevTitle ,String nextTitle) {
		this.id = id;
		this.title = title;
		this.username = username;
		this.name = name;
		this.email = email;
		this.created = created;
		this.content = content;
		this.viewCount = viewCount;
		this.prev = prev;
		this.next = next;
		this.prevTitle = prevTitle;
		this.nextTitle = nextTitle;
		this.files = files;
	}

}
