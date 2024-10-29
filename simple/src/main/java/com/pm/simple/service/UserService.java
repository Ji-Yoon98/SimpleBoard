package com.pm.simple.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pm.simple.dto.UserDTO;
import com.pm.simple.entity.User;
import com.pm.simple.mapping.UserMapping;
import com.pm.simple.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserMapping userMapping;

	// 회원가입
	public UserDTO join(UserDTO userDTO) {

		log.info("회원가입 서비스");

		User user = userMapping.toEntity(userDTO);

		User savedUser = userRepository.save(user);

		return userMapping.toDTO(savedUser);
	}

	// id 중복확인
	public boolean checkUserId(String username) {
		log.info("아이디 중복확인 서비스");
		
		return userRepository.existsByUsername(username);
	}
	
	// email 중복확인
		public boolean checkEmail(String email) {
			log.info("이메일 중복확인 서비스");
			
			return userRepository.existsByEmail(email);
		}
		
	
	// 아이디 가져오기
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	// 현재 로그인한 유저 가져오기
	public String getUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        return authentication != null ? authentication.getName() : null;
    }
 
	
}
