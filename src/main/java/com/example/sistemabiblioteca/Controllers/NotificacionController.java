package com.example.sistemabiblioteca.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sistemabiblioteca.Repository.NotificacionRepository;
import com.example.sistemabiblioteca.Service.NotificacionService;
import com.example.sistemabiblioteca.persistence.entity.NotificacionEntity;

@RequestMapping("/api/notificaciones")
@RestController
@CrossOrigin(origins = "*")
public class NotificacionController {
    
    private final NotificacionRepository notificacionRepository;
    
    @Autowired
    private NotificacionService notificacionService;
    public NotificacionController(NotificacionRepository notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<NotificacionEntity>> getNotificacionesPorUsuario(
            @PathVariable Long usuarioId,
            @RequestParam(required = false) Boolean soloNoLeidas) {
        
        List<NotificacionEntity> notificaciones;
        
        if (soloNoLeidas != null && soloNoLeidas) {
            notificaciones = notificacionRepository.findNoLeidasByUsuarioId(usuarioId);
        } else {
            notificaciones = notificacionRepository.findByidUsuario(usuarioId);
        }
        
        return ResponseEntity.ok(notificaciones);
    }
    
    @PatchMapping("/marcar-leida/{idNotificacion}")
    public ResponseEntity<Void> marcarComoLeida(@PathVariable Long idNotificacion) {
        notificacionRepository.marcarComoLeida(idNotificacion);
        return ResponseEntity.noContent().build();
    }

      @GetMapping("/contar-no-leidas/{Id_usuario}")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(@PathVariable Long Id_usuario) {
        long count = notificacionService.contarNotificacionesNoLeidas(Id_usuario);
        return ResponseEntity.ok(count);
    }
}