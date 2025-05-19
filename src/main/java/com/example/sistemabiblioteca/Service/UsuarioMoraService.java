package com.example.sistemabiblioteca.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sistemabiblioteca.Repository.UsuarioMoraRepository;

@Service
public class UsuarioMoraService {

    @Autowired
    private UsuarioMoraRepository usuariosMoraRepository;

    public boolean tieneMoraActiva(Long idUsuario) {
    return usuariosMoraRepository.existsMoraActivaByUsuarioId(idUsuario);
}


}
