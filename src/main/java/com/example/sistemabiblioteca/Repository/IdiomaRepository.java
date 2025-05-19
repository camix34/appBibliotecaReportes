package com.example.sistemabiblioteca.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.persistence.entity.IdiomaEntity;

@Repository
public interface IdiomaRepository extends CrudRepository<IdiomaEntity, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario

}
