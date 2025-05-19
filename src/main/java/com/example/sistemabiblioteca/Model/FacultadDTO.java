package com.example.sistemabiblioteca.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FacultadDTO {
    private Long id;
    private String nombre;

    public FacultadDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}
