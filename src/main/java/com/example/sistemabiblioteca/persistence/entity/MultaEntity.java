package com.example.sistemabiblioteca.persistence.entity;

import java.time.LocalDate;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MULTA")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MultaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_MULTA")
    private Long id;

    @Column(name = "MONTO")
    private Double monto;

    // Quitar @Temporal aquí
    @Column(name = "FECHAGENERADA")
    private LocalDate fechaGenerada;

    @Column(name = "IDPRESTAMO")
    private Long idPrestamo;

    @Column(name = "DIAS_RETRASO")
    private Integer diasRetraso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IDPRESTAMO", insertable = false, updatable = false)
    private PrestamoEntity prestamo;
}
