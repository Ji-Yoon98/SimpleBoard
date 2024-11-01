package com.pm.simple.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pm.simple.entity.User;
import com.pm.simple.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		User user= userRepository.findByUsername(username);

		if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + user);
        }
	
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(),
				user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
		
	}
	
}