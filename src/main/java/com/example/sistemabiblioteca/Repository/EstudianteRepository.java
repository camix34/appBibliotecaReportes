package com.example.sistemabiblioteca.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.EstudianteModel;
import com.example.sistemabiblioteca.Model.UsuarioModel;

@Repository
public interface EstudianteRepository extends CrudRepository<EstudianteModel, Long> {
     void deleteByUsuario(UsuarioModel usuario);
     Optional<EstudianteModel> findByUsuario(UsuarioModel usuario);
}
