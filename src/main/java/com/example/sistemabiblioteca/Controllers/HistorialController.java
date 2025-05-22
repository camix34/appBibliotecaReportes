package com.example.sistemabiblioteca.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sistemabiblioteca.Model.HistorialDTO;
import com.example.sistemabiblioteca.Repository.HistorialRepository;
import com.example.sistemabiblioteca.Service.HistorialService;
import com.example.sistemabiblioteca.persistence.entity.HistorialEntity;
import com.example.sistemabiblioteca.persistence.entity.IdiomaEntity;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class HistorialController {

   
    @Autowired
    private HistorialService historialService;


 @GetMapping("/historial")
    public List<HistorialDTO> listarTodosLosHistoriales() {
        return historialService.listarTodosDTO();
    }

    @GetMapping("/historial/usuario/{usuarioId}")
    public ResponseEntity<List<HistorialEntity>> obtenerHistorialPorUsuario(@PathVariable Long usuarioId) {
        List<HistorialEntity> historial = historialService.obtenerHistorialPorUsuario(usuarioId);
        return ResponseEntity.ok(historial);
    }

//endpoint para obtener el usuario con mas prestamos devueltos;
    @GetMapping("/historial/usuario/mas-prestamos")
public ResponseEntity<List<HistorialDTO>> obtenerHistorialDelUsuarioConMasPrestamos() {
    List<HistorialDTO> historial = historialService.obtenerHistorialDelUsuarioConMasPrestamosDTO();
    return ResponseEntity.ok(historial);
}


}
