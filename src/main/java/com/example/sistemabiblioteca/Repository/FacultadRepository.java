package com.example.sistemabiblioteca.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.FacultadModel;

@Repository
public interface FacultadRepository extends CrudRepository<FacultadModel,Long>{

}
