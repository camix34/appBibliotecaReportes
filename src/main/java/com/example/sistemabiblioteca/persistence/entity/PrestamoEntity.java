package com.example.sistemabiblioteca.persistence.entity;

import java.sql.Date;

import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
@Table(name = "prestamo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PrestamoEntity {

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRESTAMO")
    private Long id_Prestamo;

   

     @ManyToOne
    @JoinColumn(name = "id_material")  
    private MaterialEntity materialEntity; 

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_prestamo", nullable = false)
    private Date fecha_prestamo;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_devolucion", nullable = false)
    private Date fecha_devolucion;

    @Column(name = "fecha_devolucion_real")
    private Date fechaDevolucionReal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "IDUSUARIO", nullable = false)
    private UsuarioModel usuario;
        
}
