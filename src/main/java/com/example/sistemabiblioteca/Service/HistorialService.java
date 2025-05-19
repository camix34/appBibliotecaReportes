package com.example.sistemabiblioteca.Service;

import com.example.sistemabiblioteca.Model.HistorialDTO;
import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.Repository.HistorialRepository;
import com.example.sistemabiblioteca.persistence.entity.HistorialEntity;
import com.example.sistemabiblioteca.persistence.entity.MaterialEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistorialService {

    @Autowired
    private HistorialRepository historialRepository;

    //trae los hostoriales del usuario que esta iniciado session 
    public List<HistorialEntity> obtenerHistorialPorUsuario(Long usuarioId) {
        return historialRepository.findHistorialByUsuarioId(usuarioId);
    }

    //obtiene todos los historiales de materiales devueltos
    public List<HistorialEntity> listarTodos() {
        return (List<HistorialEntity>) historialRepository.findAll();
    }
    
      public List<HistorialDTO> listarTodosDTO() {
        List<HistorialEntity> historiales = (List<HistorialEntity>) historialRepository.findAll();

        return historiales.stream().map(historial -> {
            UsuarioModel usuario = historial.getUsuario();
            MaterialEntity material = historial.getMaterial();

            return new HistorialDTO(
                    historial,
                    usuario != null ? usuario.getCarnet()  : "Desconocido",
                    material != null ? material.getTitulo() : "Sin título"
            );
        }).collect(Collectors.toList());
    }


    //metodo en el service para encontrar al usuario con mas registros
    public List<HistorialDTO> obtenerHistorialDelUsuarioConMasPrestamosDTO() {
    List<Long> topUsuarios = historialRepository.findTopUsuariosConMasPrestamos(PageRequest.of(0, 1));

    if (!topUsuarios.isEmpty()) {
        Long usuarioId = topUsuarios.get(0);
        List<HistorialEntity> historiales = historialRepository.findHistorialByUsuarioId(usuarioId);

        return historiales.stream().map(historial -> {
            var usuario = historial.getUsuario();
            var material = historial.getMaterial();

            return new HistorialDTO(
                    historial,
                    usuario != null ? usuario.getCarnet() : "Desconocido",
                    material != null ? material.getTitulo() : "Sin título"
            );
        }).collect(Collectors.toList());
    }

    return List.of(); // Lista vacía si no hay datos
}

}
