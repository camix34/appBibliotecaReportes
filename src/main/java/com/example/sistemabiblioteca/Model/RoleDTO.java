package com.example.sistemabiblioteca.Model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RoleDTO {

    private String roleEnum;

    // Constructor, getters y setters

    public RoleDTO(String roleEnum) {
        this.roleEnum = roleEnum;
    }
}