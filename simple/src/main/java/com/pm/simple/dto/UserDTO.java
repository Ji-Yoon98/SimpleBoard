package com.pm.simple.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

	String username;
	
	String password;
	
	String name;
	
	String email;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	LocalDateTime register; 
	
	String role;

	@Builder
	public UserDTO(String username, String password, String name, String email, LocalDateTime register, String role) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.register = register;
		this.role = role;
	}

}
