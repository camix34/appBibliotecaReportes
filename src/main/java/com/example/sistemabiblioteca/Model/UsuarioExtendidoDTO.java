package com.example.sistemabiblioteca.Model;


import lombok.*;

import java.sql.Date;
import java.util.List;


@Getter
@Setter


public class UsuarioExtendidoDTO {
      private Long idusuario;
    private String carnet;
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String email;
    private String telefono;
    private String tipo;
    private String direccion;
    private Date fecha_registro;

    private String username;
    private boolean isEnabled;

    // Usar RoleDTO en lugar de RoleEntity para evitar ciclos de referencia
    private List<RoleDTO> roles;

    // Constructor, Getters y Setters

    public UsuarioExtendidoDTO() {
        // Constructor vacío
    }

    // Constructor con los atributos necesarios
    public UsuarioExtendidoDTO(Long idusuario, String carnet, String nombre, String apellido1, String apellido2,
            String email, String telefono, String tipo, String direccion, Date fecha_registro, String username,
            boolean isEnabled, List<RoleDTO> roles) {
        this.idusuario = idusuario;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
        this.username = username;
        this.isEnabled = isEnabled;
      
        this.roles = roles;
    }
}
