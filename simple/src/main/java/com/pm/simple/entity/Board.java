package com.pm.simple.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BOARD_ID")
	private Long id;

	private String title; 					// 제목

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	private User user; 						// user
	
	@CreationTimestamp
	private LocalDateTime created; 		// 작성일

	private String content;					// 내용
	
	private int viewCount; // 조회수
	
	//게시글 삭제 -> 첨부파일 먼저 삭제
	@OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<File> files;
	
	@Transient
	private Long prev;
	
	@Transient
	private Long next;
	
	@Transient
	private String prevTitle;
	
	@Transient
	private String nextTitle;

	@Builder
	public Board(Long id, String title, User user, LocalDateTime created, String content, int viewCount, List<File> files, Long prev, Long next ,String prevTitle ,String nextTitle) {
		this.id = id;
		this.title = title;
		this.user = user;
		this.created = created;
		this.content = content;
		this.viewCount = viewCount;
		this.prev = prev;
		this.next = next;
		this.prevTitle = prevTitle;
		this.nextTitle = nextTitle;
		this.files = files;
	}
	
	// 게시글 수정
	public void update(String title, String content, List<File> files, LocalDateTime created) {
		this.title = title;
		this.content = content;
		this.files = files;
		this.created = created;
    }
	
	// 조회수
	public void viewCount() {
        this.viewCount++;
    }
	
}
