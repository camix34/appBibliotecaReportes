package com.example.sistemabiblioteca.Repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;

@Repository
public interface UserRepositoryJPA extends JpaRepository<UserEntity, Long> {

    //Optional<UserEntity> findByUsernameAndRoles(String username,   RoleEntity roleEntity);
    Optional<UserEntity> findByUsername(String username);
}