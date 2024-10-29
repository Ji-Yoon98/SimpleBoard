package com.pm.simple.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pm.simple.dto.UserDTO;
import com.pm.simple.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserService userService;

	// 회원가입
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {
		log.info("회원가입 컨트롤러");

		UserDTO userJoin = userService.join(userDTO);

		if (userJoin != null) {
			return ResponseEntity.ok().body(userJoin);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 생성 실패");
		}
	}

	// ID 중복확인
	@GetMapping("/isUsername/{username}")
	public ResponseEntity<Boolean> checkUsername(@PathVariable("username") String username) {
		log.info("아이디 중복확인 컨트롤러 확인");

		boolean isDuplicate = userService.checkUserId(username);

		return ResponseEntity.ok(isDuplicate);
	}
	
	// 이메일 중복확인
	@GetMapping("/isEmail/{email}")
	public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email) {
		log.info("이메일 중복확인 컨트롤러 확인");
	
		boolean isDuplicate = userService.checkEmail(email);
	
		return ResponseEntity.ok(isDuplicate);
	}
	
	// 시큐리티 로그인 성공 -> 로그인 한 유저 값 넘김
	@GetMapping("/loginOk")
    public ResponseEntity<Map<String, String>> loginOk() {
        String username = userService.getUsername();

        System.out.println("로그인한 유저:" + username);

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("username", username);

        return ResponseEntity.ok(userInfo);
    }
	
	// 로그인 상태 확인
	@GetMapping("/loginCheck")
	public ResponseEntity<Boolean> loginCheck(Authentication authentication) {
		System.out.println("로그인 체크 컨트롤러");
	    boolean isLogin = authentication != null && authentication.isAuthenticated();
	    return ResponseEntity.ok(isLogin);
	}

	
	// 로그아웃
	@GetMapping("/logoutOk")
    public ResponseEntity<Void> logoutOk() {
        System.out.println("로그아웃 성공");
        return ResponseEntity.ok().build();
    }


}
