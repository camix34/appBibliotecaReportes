package com.example.sistemabiblioteca.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PerfilDTO {

     private Long idusuario;
    private String carnet;
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String email;
    private String telefono;
    private String tipo;
    private String direccion;
    private String username;

    //solo para bibliotecario
    private String area;

    // Solo para estudiantes
    private Long carrera;
    private Long facultad;
    private String nombreCarrera;

    // Solo para docentes
    private Long especialidad;
    private Long departamento;
    private String dui;
}
