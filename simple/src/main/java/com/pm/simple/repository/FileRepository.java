package com.pm.simple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pm.simple.entity.File;

@Repository
public interface FileRepository extends JpaRepository<File , Long>{

}
