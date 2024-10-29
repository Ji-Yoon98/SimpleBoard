package com.pm.simple.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_ID")
	private Long id;

	@Column(unique = true)
	private String username; // 아이디

	private String password; // 패스워드

	private String name; // 이름

	private String email; // 이메일
	
	private LocalDateTime register; // 가입일

	private String role; // 권한

	@Builder
	public User(String username, String password, String name, String email, LocalDateTime register, String role) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.register = register;
		this.role = role;
	}

}
