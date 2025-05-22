package com.example.sistemabiblioteca.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PROFESOR")
public class ProfesorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PROFESOR")
    private Long id_profesor;

    @ManyToOne
    @JoinColumn(name = "FACULTAD_ID")
    private FacultadModel IdFacultad;

    
    @OneToOne
    @JoinColumn(name = "IDUSUARIO")
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn(name = "ID_CONTRATO")
    private TipoContratoModel contrato_id;

    @OneToOne
    @JoinColumn(name = "ESPECIALIDAD_ID")
    private EspecialidadModel especialidad;

    @Column(name = "DUI")
    private String dui;


}
