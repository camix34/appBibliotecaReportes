package com.example.sistemabiblioteca.persistence.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USUARIOS_MORA")
public class Usuarios_MoraEntity {
    
    @Id
    @Column(name = "ID_USUARIO_MORA")
    private Long idUsuario;

    @Column(name = "IDMULTA")
    private Long idMulta;

    @Column(name = "ESTADOPENALIZACION")
    private Integer estadoPenalizacion;

    @Temporal(TemporalType.DATE)
    @Column(name = "FECHA_REGISTRO")
    private LocalDate fechaRegistro;

     @Column(name = "FECHA_FIN")
    private LocalDate fechaFin;

     @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IDMULTA", insertable = false, updatable = false)
    private MultaEntity multa;
}
