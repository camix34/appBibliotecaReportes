package com.example.sistemabiblioteca.Model;


import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MEMBRESIA")
public class MembresiaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_MEMBRESIA")
    private Long idMembresia;

    @Column(name = "FECHAINICIO")
    private Date fechaInicio;

    @Column(name = "FECHAFIN")
    private Date fechaFin;

    @Column(name = "ESTADO")
    private Long estado;

    @ManyToOne
    @JoinColumn(name = "IDUSUARIO")
    private UsuarioModel usuario;
}
