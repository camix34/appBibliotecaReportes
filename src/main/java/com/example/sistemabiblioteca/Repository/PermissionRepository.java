package com.example.sistemabiblioteca.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.sistemabiblioteca.persistence.entity.PermissionsEntity;

public interface PermissionRepository extends CrudRepository<PermissionsEntity, Long> {
    boolean existsByName(String name);
    Optional<PermissionsEntity> findByName(String name);
}
