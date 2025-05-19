package com.example.sistemabiblioteca.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "CARRERAS")
public class CarrerasModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name ="ID_CARRERA")
    private Long id;

    @Column(name = "NOMBRE", unique = true)
    private String nombre;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @OneToMany(mappedBy = "carrera")
    @JsonBackReference
    private List<EstudianteModel> estudiantes;
}
