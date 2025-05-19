package com.example.sistemabiblioteca.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.example.sistemabiblioteca.Model.UsuarioModel;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "HISTORIAL_PRESTAMO")
public class HistorialEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "historial_seq")
    @SequenceGenerator(name = "historial_seq", sequenceName = "HISTORIAL_SEQ", allocationSize = 1)
    @Column(name = "ID_HISTORIAL")
    private Long idHistorial;

    @Column(name = "ID_PRESTAMO")  
    private Long prestamo; 

    //@Column(name = "ID_USUARIO")
    //private Long idUsuario;

    @ManyToOne
    @JoinColumn(name = "ID_MATERIAL")  
    private MaterialEntity material; 

    @Column(name = "FECHA_PRESTAMO")
    private LocalDate fechaPrestamo;

    @Column(name = "FECHA_DEVOLUCION")
    private LocalDate fechaDevolucion;

    @Column(name = "FECHA_REGISTRO")
    private LocalDate fechaRegistro;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "id_usuario", referencedColumnName = "IDUSUARIO", nullable = false)
    //private UsuarioModel usuario;

    @ManyToOne
@JoinColumn(name = "id_usuario")
private UsuarioModel usuario;

@Column(name = "id_usuario", insertable = false, updatable = false)
private Long idUsuario;
        

//@Column(name = "id_usuario", insertable = false, updatable = false)
//private Long idUsuario;
}