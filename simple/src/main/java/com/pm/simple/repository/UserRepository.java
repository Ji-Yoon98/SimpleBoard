package com.pm.simple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pm.simple.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	// ID 중복확인
	Boolean existsByUsername(String username);
	
	User findByUsername(String username);
	
	// email 중복확인
	Boolean existsByEmail(String email);
} 
