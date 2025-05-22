package com.example.sistemabiblioteca.Controllers;

import java.sql.Date;
import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sistemabiblioteca.Model.PrestamoDTO;
import com.example.sistemabiblioteca.Model.PrestamoMultaDTO;
import com.example.sistemabiblioteca.Repository.MaterialRepository;
// Removed unused MaterialRepository import
import com.example.sistemabiblioteca.Repository.PrestamoRepository;
import com.example.sistemabiblioteca.Repository.UsuarioMoraRepository;
import com.example.sistemabiblioteca.Service.MultaService;
import com.example.sistemabiblioteca.Service.PrestamoService;
import com.example.sistemabiblioteca.persistence.entity.MaterialEntity;
import com.example.sistemabiblioteca.persistence.entity.PrestamoEntity;
import com.example.sistemabiblioteca.persistence.entity.Usuarios_MoraEntity;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class PrestamoController {
      @Autowired
    private PrestamoRepository prestamoRepository;
      @Autowired
    private MaterialRepository materialRepository;
     @Autowired
    private PrestamoService prestamoService;

    @Autowired
    private UsuarioMoraRepository usuarioMoreRepo;

    @Autowired
    private MultaService multaService;

   @GetMapping("/prestamos")
    public List<PrestamoEntity> listarTodasLasCategorias() {
        return (List<PrestamoEntity>) prestamoRepository.findAll();
    }


     // metodo para guardar un Material
    @PostMapping("/prestamos")
    public PrestamoEntity guardarPrestamos(@RequestBody PrestamoEntity prestamo) {
        return prestamoRepository.save(prestamo);
    }

    // Metodo para buscar idioma por id
    @GetMapping("/prestamos/{id}")
    public ResponseEntity<PrestamoEntity> obtenerMaterialPorId(@PathVariable Long id) {
        PrestamoEntity prestamo = prestamoRepository.findById(id).orElse(null);
        if (prestamo != null) {
            return ResponseEntity.ok(prestamo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Metodo para actualizar idioma por id



    // metodo para eliminar un prestamo
    @DeleteMapping("prestamos/{id}")
    public ResponseEntity<Void> eliminarPrestamo(@PathVariable Long id) {
        if (prestamoRepository.existsById(id)) {
            prestamoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //metodo para  devolver un material
    
@PostMapping("prestamos/{id_prestamo}/return")
public ResponseEntity<String> devolverMaterial(@PathVariable Long id_prestamo) {
    Optional<PrestamoEntity> prestamoOpt = prestamoRepository.findById(id_prestamo);

    if (!prestamoOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Préstamo no encontrado");
    }

    PrestamoEntity prestamo = prestamoOpt.get();
    MaterialEntity material = prestamo.getMaterialEntity();

    // Sumar 1 al stock disponible
    prestamo.setFechaDevolucionReal(new java.sql.Date(System.currentTimeMillis()));

    material.setSTOCKDISPONIBLE(material.getSTOCKDISPONIBLE() + 1);
    materialRepository.save(material);

    // Eliminar el préstamo 
    prestamoRepository.delete(prestamo);

    return ResponseEntity.ok("Material devuelto correctamente");

}



@GetMapping("/prestamos/usuario/{usuarioId}")
public ResponseEntity<List<PrestamoEntity>> obtenerPrestamosPorUsuario(@PathVariable Long usuarioId) {
    List<PrestamoEntity> prestamos = prestamoService.obtenerPrestamosPorUsuario(usuarioId);
    return ResponseEntity.ok(prestamos);
}


    // Endpoint para obtener préstamos con estado de multa y penalización por usuario
    @GetMapping("/prestamo/usuario/multa/{usuarioId}")
    public ResponseEntity<List<PrestamoDTO>> obtenerPrestamosConEstado(@PathVariable Long usuarioId) {
        List<PrestamoDTO> prestamosConEstado = prestamoService.obtenerPrestamosConEstado(usuarioId);
        return ResponseEntity.ok(prestamosConEstado);
    }

    @PostMapping("pagar-multas/{idUsuario}")
        public ResponseEntity<String> pagarMultas(@PathVariable Long idUsuario) {
            multaService.pagarMultasPorUsuario(idUsuario);
            return ResponseEntity.ok("Multas eliminadas correctamente.");
        }
    @GetMapping("usuarios_mora/all")
    public ResponseEntity<Iterable<Usuarios_MoraEntity>> obtenerUsuariosMora() {
        Iterable<Usuarios_MoraEntity> usuarioMora = usuarioMoreRepo.findAll();
        return ResponseEntity.ok(usuarioMora);
    }

    
    // Endpoint para eliminar multas y usuarios_mora por usuario
    @DeleteMapping("/eliminar-multa/{idUsuario}")
    public ResponseEntity<String> eliminarMultasYUsuariosMoraPorUsuario(@PathVariable Long idUsuario) {
        try {
            multaService.eliminarMultasYUsuariosMoraPorUsuario(idUsuario);
            return ResponseEntity.ok("Multas y usuarios_mora eliminados para usuario ID: " + idUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar multas y usuarios_mora: " + e.getMessage());
        }
    }
    
    //renovar prestamo
@PutMapping("/prestamos/{idprestamo}/renovar")
public ResponseEntity<String> solicitarRenovacionPrestamo(@PathVariable Long idprestamo) {
    Optional<PrestamoEntity> prestamoOpt = prestamoRepository.findById(idprestamo);

    if (!prestamoOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Préstamo no encontrado");
    }

    PrestamoEntity prestamo = prestamoOpt.get();

    if ("PENDIENTE".equalsIgnoreCase(prestamo.getEstadoRenovacion())) {
        return ResponseEntity.badRequest().body("Ya hay una solicitud de renovación pendiente.");
    }

    // Marcar la renovación como pendiente
    prestamo.setEstadoRenovacion("PENDIENTE");
    prestamoRepository.save(prestamo);

    return ResponseEntity.ok("Solicitud de renovación enviada. Esperando aprobación del bibliotecario.");
}


// aprueba la solicitud de prestamo
@PutMapping("/prestamos/{idprestamo}/aprobar-renovacion")
public ResponseEntity<String> aprobarRenovacion(@PathVariable Long idprestamo, @RequestParam("aprobado") boolean aprobado) {
    Optional<PrestamoEntity> prestamoOpt = prestamoRepository.findById(idprestamo);

    if (!prestamoOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Préstamo no encontrado");
    }

    PrestamoEntity prestamo = prestamoOpt.get();

    if (!"PENDIENTE".equalsIgnoreCase(prestamo.getEstadoRenovacion())) {
        return ResponseEntity.badRequest().body("No hay solicitud de renovación pendiente para este préstamo.");
    }

    if (aprobado) {
        Date nuevaFecha = new Date(prestamo.getFecha_devolucion().getTime() + 90L * 24 * 60 * 60 * 1000); // 3 meses más para el profesor
        prestamo.setFecha_devolucion(new java.sql.Date(nuevaFecha.getTime()));
        prestamo.setEstadoRenovacion("APROBADO");
        prestamoRepository.save(prestamo);
        return ResponseEntity.ok("Renovación aprobada y fecha de devolución extendida.");
    } else {
        prestamo.setEstadoRenovacion("RECHAZADO");
        prestamoRepository.save(prestamo);
        return ResponseEntity.ok("Renovación rechazada por el bibliotecario.");
    }
}
//ver las solicitudes de removacion de prestamos
@GetMapping("/prestamos/renovaciones/pendientes")
public ResponseEntity<List<PrestamoEntity>> obtenerRenovacionesPendientes() {
    List<PrestamoEntity> pendientes = prestamoRepository.findByEstadoRenovacion("PENDIENTE");
    return ResponseEntity.ok(pendientes);
}

}
