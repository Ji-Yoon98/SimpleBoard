package com.pm.simple.config;

import lombok.AllArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
	
	private final AuthenticationFailureHandler customFailureHandler;
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); // 허용할 origin 설정
        configuration.addAllowedMethod("*"); // 모든 HTTP 메소드 허용
        configuration.addAllowedHeader("*"); // 모든 헤더 허용
        configuration.setAllowCredentials(true); // 쿠키 허용
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 위 설정 적용
        return source;
    }
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.csrf((auth) -> auth.disable());
		
		http.cors((cors) -> cors.configurationSource(corsConfigurationSource()));

	    // From 로그인 방식
	    http.formLogin((auth) -> auth
	    		.loginPage("/login")
	    		.defaultSuccessUrl("/loginOk")
	    		.failureHandler(customFailureHandler)
	    		.permitAll());
	    
	    // 로그아웃
	    http.logout((logout) -> logout
				.logoutUrl("/logout")
				.logoutSuccessUrl("/logoutOk")
				.deleteCookies("JSESSIONID"));

	
	    // HTTP Basic 인증 방식 disable
	    http.httpBasic((auth) -> auth.disable());
	
		// 경로별 인가 작업(일단 전체 열어둠)
		http.authorizeHttpRequests((auth) -> auth
				.requestMatchers("/**").permitAll()
				.anyRequest().authenticated());
		
	
		return http.build();
	}
	
	
	// 비밀번호 암호화
	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

}
