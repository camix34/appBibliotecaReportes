package com.example.sistemabiblioteca.Repository;
import com.example.sistemabiblioteca.Model.UsuarioModel;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

     Optional<UsuarioModel> findByIdusuario(Long idusuario);
  

    @Query("SELECT DISTINCT u FROM UsuarioModel u")
    List<UsuarioModel> findAllDistinctUsuarios();

    long count();

}