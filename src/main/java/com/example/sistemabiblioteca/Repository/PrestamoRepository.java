package com.example.sistemabiblioteca.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.sistemabiblioteca.persistence.entity.PrestamoEntity;

import jakarta.transaction.Transactional;
public interface PrestamoRepository extends JpaRepository<PrestamoEntity, Long> {

    @Query("SELECT p FROM PrestamoEntity p WHERE p.materialEntity.id = :materialId AND p.usuario.id = :usuarioId")
    Optional<PrestamoEntity> findByMaterialAndUsuario(@Param("materialId") Long materialId, @Param("usuarioId") Long usuarioId);

    @Query("SELECT COUNT(p) FROM PrestamoEntity p WHERE p.usuario.id = :usuarioId AND p.fechaDevolucionReal IS NULL")
    int contarPrestamosActivosPorUsuario(@Param("usuarioId") Long usuarioId);

    @Query("SELECT p FROM PrestamoEntity p WHERE p.usuario.id = :usuarioId")
    List<PrestamoEntity> findPrestamosByUsuarioId(@Param("usuarioId") Long usuarioId);

    // Corregido para usar PrestamoEntity y atributos correctos:
    @Query("SELECT p.id FROM PrestamoEntity p WHERE p.usuario.id = :usuarioId")
    List<Long> findIdsPrestamoByIdUsuario(@Param("usuarioId") Long usuarioId);

    
   @Query("SELECT p FROM PrestamoEntity p WHERE p.usuario.id = :usuarioId AND p.fechaDevolucionReal IS NULL")
List<PrestamoEntity> findPrestamosActivosByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Modifying
    @Transactional
    @Query("UPDATE PrestamoEntity p SET p.fecha_devolucion = :nuevaFecha WHERE p.id_Prestamo = :prestamoId")
    void actualizarFechaDevolucionPorId(@Param("prestamoId") Long prestamoId, @Param("nuevaFecha") Date nuevaFecha);
    }
