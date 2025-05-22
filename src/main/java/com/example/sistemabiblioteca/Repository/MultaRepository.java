package com.example.sistemabiblioteca.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.persistence.entity.MultaEntity;

import jakarta.transaction.Transactional;


public interface MultaRepository extends JpaRepository<MultaEntity, Long> {

    Optional<MultaEntity> findByIdPrestamo(Long id_Prestamo);
    
    boolean existsByIdPrestamo(Long idPrestamo);

      void deleteByPrestamoUsuarioIdusuario(Long idusuario);

    @Query("SELECT m.id FROM MultaEntity m WHERE m.idPrestamo IN :idPrestamos")
List<Long> findIdsMultaByIdPrestamoIn(@Param("idPrestamos") List<Long> idPrestamos);

    void deleteByIdPrestamoIn(List<Long> idPrestamos);

     @Query("SELECT m FROM MultaEntity m WHERE m.prestamo.usuario.id = :idUsuario")
List<MultaEntity> findByPrestamoUsuarioId(@Param("idUsuario") Long idUsuario);
}
