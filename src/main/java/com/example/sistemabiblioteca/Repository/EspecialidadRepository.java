package com.example.sistemabiblioteca.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.Model.EspecialidadModel;

import lombok.Getter;
import lombok.Setter;

@Repository
public interface EspecialidadRepository extends CrudRepository<EspecialidadModel,Long>{

}
