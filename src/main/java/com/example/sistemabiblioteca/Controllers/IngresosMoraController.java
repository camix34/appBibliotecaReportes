package com.example.sistemabiblioteca.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.sistemabiblioteca.Repository.IngresosMoraRepository;

import com.example.sistemabiblioteca.persistence.entity.IngresosMoraEntity;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class IngresosMoraController {

        @Autowired

    private IngresosMoraRepository ingresosMoraRepository;


    //metodo para traer la lista de los ingresos por mora 
   @GetMapping("/ingresos_mora")
    public List<IngresosMoraEntity> listarIngresosMora() {
        return (List<IngresosMoraEntity>) ingresosMoraRepository.findAll();
    }

}
