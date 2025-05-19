package com.example.sistemabiblioteca.persistence.entity;

import java.util.Date;

import com.example.sistemabiblioteca.Model.UsuarioModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "NOTIFICACIONES_PRESTAMO")
public class NotificacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_NOTIFICACION")
    private Long idNotificacion;

    @Column(name = "ID_PRESTAMO")
    private Long Id_Prestamo;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "TITULO_MATERIAL")
    private String tituloMaterial;

    @Column(name = "MENSAJE")
    private String mensaje;

    @Column(name = "FECHA_NOTIFICACION")
    private Date fechaNotificacion;

    @Column(name = "LEIDA")
    private boolean leida;

   

}
