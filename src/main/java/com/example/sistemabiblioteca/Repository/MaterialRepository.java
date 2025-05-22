package com.example.sistemabiblioteca.Repository;

import org.springframework.data.repository.CrudRepository;

import com.example.sistemabiblioteca.persistence.entity.MaterialEntity;

public interface MaterialRepository extends CrudRepository<MaterialEntity, Long>{

}
