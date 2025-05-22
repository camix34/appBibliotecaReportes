package com.example.sistemabiblioteca.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ActualizarDocenteDTO {

    
    private Long idusuario;
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String email;
    private String Telefono;
    private String direccion;

    //datos del docente
    private Long especialidad_id;
    private Long contrato_id;
    private Long idFacultad;
    private String dui;
    

    public ActualizarDocenteDTO(){

    }
}
