package com.example.sistemabiblioteca.Repository;

import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;

import java.util.Optional;


import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioEntityRepository extends CrudRepository<UserEntity,Long>{

 
  

    boolean existsByUsername(String name);
    Optional<UserEntity> findUserEntityByUsername(String name);
    Optional<UserEntity> findByUsuario(UsuarioModel usuario);
     // Este es el método que necesitas
   
}
