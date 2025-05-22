package com.example.sistemabiblioteca.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.BibliotecarioModel;
import com.example.sistemabiblioteca.Model.UsuarioModel;

@Repository
public interface BibliotecarioRepository extends CrudRepository<BibliotecarioModel,Long>{
     void deleteByUsuario(UsuarioModel usuario);
     Optional<BibliotecarioModel> findByUsuario(UsuarioModel usuario);
     
}
