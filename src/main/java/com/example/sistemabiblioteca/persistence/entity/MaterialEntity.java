package com.example.sistemabiblioteca.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "material")
public class MaterialEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_material;

    @Column(name = "titulo", unique = true, nullable = false, length = 200)
    private String titulo;

    @Column(name = "autor", nullable = false, length = 200)
    private String autor;

    @Column(name = "ANIOPUBLICACION", nullable = false, length = 50)
    private Long ANIOPUBLICACION;

    @Column(name = "TIPOMATERIAL", nullable = false, length = 200)
    private String TIPOMATERIAL;

    @Column(name = "STOCKDISPONIBLE", nullable = false, length = 200)
    private Integer STOCKDISPONIBLE;

    @Column(name = "imagen_portada", unique = true, nullable = false, length = 200)
    private String imagen_portada;

  @ManyToOne
    @JoinColumn(name = "IDCategoria")  
    private Categoriaentity idCategoria; 

      @ManyToOne
    @JoinColumn(name = "id_idioma")  
    private IdiomaEntity idIdioma; 

}
