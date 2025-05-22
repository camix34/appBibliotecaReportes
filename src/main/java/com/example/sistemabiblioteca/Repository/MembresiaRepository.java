package com.example.sistemabiblioteca.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.MembresiaModel;
import com.example.sistemabiblioteca.Model.UsuarioModel;

@Repository
public interface MembresiaRepository extends CrudRepository<MembresiaModel,Long> {
     MembresiaModel findByUsuario_IdusuarioAndEstado(Long idusuario, Long estado);
    Optional<MembresiaModel> findByUsuarioAndEstado(UsuarioModel usuario, int estado);
}

