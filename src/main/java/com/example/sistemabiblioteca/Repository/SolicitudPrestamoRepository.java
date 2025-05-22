package com.example.sistemabiblioteca.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sistemabiblioteca.persistence.entity.SolicitudPrestamoEntity;

public interface SolicitudPrestamoRepository extends JpaRepository<SolicitudPrestamoEntity, Long> {
    List<SolicitudPrestamoEntity> findByEstado(String estado);
}