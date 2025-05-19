package com.example.sistemabiblioteca.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.BibliotecarioModel;
import com.example.sistemabiblioteca.Model.ProfesorModel;
import com.example.sistemabiblioteca.Model.UsuarioModel;

@Repository
public interface ProfesorRepository extends CrudRepository<ProfesorModel,Long>{

      void deleteByUsuario(UsuarioModel usuario);
     Optional<ProfesorModel> findByUsuario(UsuarioModel usuario);

}
