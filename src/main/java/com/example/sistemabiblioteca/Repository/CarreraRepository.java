package com.example.sistemabiblioteca.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.sistemabiblioteca.Model.CarrerasModel;


@Repository
public interface CarreraRepository extends CrudRepository<CarrerasModel, Long> {

    
}