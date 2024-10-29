package com.pm.simple.mapping;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.pm.simple.dto.UserDTO;
import com.pm.simple.entity.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserMapping {
  private final BCryptPasswordEncoder passwordEncoder;

  // dto -> entity
  public User toEntity(UserDTO userDTO) {
	  return User.builder()
			  .username(userDTO.getUsername())
			  .password(passwordEncoder.encode(userDTO.getPassword()))
			  .name(userDTO.getName())
			  .email(userDTO.getEmail())
			  .register(LocalDateTime.now())
			  .role("ROLE_USER")
			  .build();
  }

  // entity -> dto
  public UserDTO toDTO(User user) {
	  return UserDTO.builder()
			  .username(user.getUsername())
			  .name(user.getName())
			  .email(user.getEmail())
			  .register(user.getRegister())
			  .role(user.getRole())
			  .build();
  }
}
