package com.example.sistemabiblioteca.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EspecialidadDTO {

     private Long id_especialidad;
    private String nombre;

    public EspecialidadDTO(Long id_especialidad, String nombre) {
        this.id_especialidad = id_especialidad;
        this.nombre = nombre;
    }
}
