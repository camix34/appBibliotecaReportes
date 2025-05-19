package com.example.sistemabiblioteca.Model;


import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UsuarioLoginDTO {
   

    private String username;
    private String password;
    private Long idUsuario;         // ID de UsuarioModel
    private Set<Long> roles;        // Lista de IDs de RoleEntity
}
