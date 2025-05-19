package com.example.sistemabiblioteca.persistence.entity;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CreateRoleRequest {
    private String roleEnum;
    private List<Long> permisoIds;

}
