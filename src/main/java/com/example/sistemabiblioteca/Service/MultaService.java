package com.example.sistemabiblioteca.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sistemabiblioteca.Repository.MultaRepository;
import com.example.sistemabiblioteca.Repository.PrestamoRepository;
import com.example.sistemabiblioteca.Repository.UsuarioMoraRepository;
import com.example.sistemabiblioteca.persistence.entity.MultaEntity;
import com.example.sistemabiblioteca.persistence.entity.PrestamoEntity;

import jakarta.transaction.Transactional;

@Service
public class MultaService {

    @Autowired
    private MultaRepository multaRepo;

      @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private MultaRepository multaRepository;

    @Autowired
    private UsuarioMoraRepository usuariosMoraRepository;


  @Transactional
    public void pagarMultasPorUsuario(Long idUsuario) {
          List<MultaEntity> multas = multaRepository.findByPrestamoUsuarioId(idUsuario);
    
    if (multas.isEmpty()) {
        throw new RuntimeException("El usuario no tiene multas pendientes");
    }

    multas.forEach(multa -> {
        // Opcional: Actualizar fecha de devolución del préstamo asociado
        PrestamoEntity prestamo = multa.getPrestamo();
        prestamo.setFecha_devolucion(new java.sql.Date(System.currentTimeMillis() + 86400000)); // +1 día
        prestamoRepository.save(prestamo);
        
        multaRepository.delete(multa);
    });
}

 @Transactional
public void eliminarMultasYUsuariosMoraPorUsuario(Long idUsuario) {
    // Obtener IDs de préstamos asociados al usuario
    List<Long> prestamosIds = prestamoRepository.findIdsPrestamoByIdUsuario(idUsuario);

    if (prestamosIds.isEmpty()) {
        // No hay préstamos para ese usuario, no se hace nada
        return;
    }

    // Obtener IDs de multas relacionadas a esos préstamos
    List<Long> multasIds = multaRepository.findIdsMultaByIdPrestamoIn(prestamosIds);

    // Si hay multas, eliminar primero los registros en UsuariosMora relacionados a esas multas
    if (!multasIds.isEmpty()) {
        usuariosMoraRepository.deleteByIdMultaIn(multasIds);
    }

    // Eliminar las multas asociadas a esos préstamos
    multaRepository.deleteByIdPrestamoIn(prestamosIds);
         // Actualizar fecha de devolución de todos los préstamos activos (hoy + 1 día)
    List<PrestamoEntity> prestamosActivos = prestamoRepository.findPrestamosActivosByUsuarioId(idUsuario);
    java.sql.Date nuevaFecha = java.sql.Date.valueOf(LocalDate.now().plusDays(1));
    for (PrestamoEntity prestamo : prestamosActivos) {
        prestamoRepository.actualizarFechaDevolucionPorId(prestamo.getId_Prestamo(), nuevaFecha);
    }
          
}
}
