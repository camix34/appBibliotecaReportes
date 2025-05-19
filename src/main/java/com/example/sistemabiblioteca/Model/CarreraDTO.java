package com.example.sistemabiblioteca.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarreraDTO {
    private Long id;
    private String nombre;

    public CarreraDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}
