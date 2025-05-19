package com.example.sistemabiblioteca.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name="PERMISOS_REGISTRADOS")
public class PermissionsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="ID_PERMISO")
    private Long id;

    @Column(name = "NOMBRE_PERMISO")
    private String name;

    
}
