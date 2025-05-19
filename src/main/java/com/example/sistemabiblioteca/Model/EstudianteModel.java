package com.example.sistemabiblioteca.Model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "ESTUDIANTE")
public class EstudianteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ESTUDIANTE")
    private Long id;

    // Relación unidireccional con Usuario
    @OneToOne
    @JoinColumn(name = "IDUSUARIO")
    private UsuarioModel usuario;

    // Relación unidireccional con Facultad
    @ManyToOne
    @JoinColumn(name = "IDFACULTAD")
    private FacultadModel facultad;

    // Relación unidireccional con Carrera
    @ManyToOne
    @JoinColumn(name = "IDCARRERA")
    private CarrerasModel carrera;
}
