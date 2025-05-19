package com.example.sistemabiblioteca.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.sistemabiblioteca.persistence.entity.NotificacionEntity;

import jakarta.transaction.Transactional;

public interface NotificacionRepository extends CrudRepository<NotificacionEntity,Long> {

    
      // Consulta directa por ID de usuario
    @Query("SELECT n FROM NotificacionEntity n WHERE n.idUsuario = :usuarioId ORDER BY n.fechaNotificacion DESC")
    List<NotificacionEntity> findByidUsuario(@Param("usuarioId") Long usuarioId);
    
    // Consulta para notificaciones no leídas
    @Query("SELECT n FROM NotificacionEntity n WHERE n.idUsuario = :usuarioId AND n.leida = false ORDER BY n.fechaNotificacion DESC")
    List<NotificacionEntity> findNoLeidasByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    // Método para marcar como leída
     @Transactional 
    @Modifying
    @Query("UPDATE NotificacionEntity n SET n.leida = true WHERE n.idNotificacion = :idNotificacion")
    void marcarComoLeida(@Param("idNotificacion") Long idNotificacion);

     long countByIdUsuarioAndLeidaFalse(Long idUsuario);

}
