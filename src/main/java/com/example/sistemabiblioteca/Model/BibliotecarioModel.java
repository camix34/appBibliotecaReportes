package com.example.sistemabiblioteca.Model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BIBLIOTECARIO")
public class BibliotecarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_BIBLIOTECARIO")
    private Long id_bibliotecario;

    // Relación unidireccional con UsuarioModel
    @OneToOne
    @JoinColumn(name = "IDUSUARIO")
    private UsuarioModel usuario;

    @Column(name = "AREA")
    private String area;

     @Column(name = "DUI")
    private String dui;

       // Relación con TipoContratoModel
    @ManyToOne
    @JoinColumn(name = "CONTRATO_ID")
    private TipoContratoModel contrato_id;

   
}