package com.example.sistemabiblioteca.Service;

import org.springframework.stereotype.Service;

import com.example.sistemabiblioteca.Repository.NotificacionRepository;

@Service
public class NotificacionService {

     private final NotificacionRepository notificacionRepository;
    
    public NotificacionService(NotificacionRepository notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }
    
    public long contarNotificacionesNoLeidas(Long id_usuario) {
        return notificacionRepository.countByIdUsuarioAndLeidaFalse(id_usuario);
    }

}
