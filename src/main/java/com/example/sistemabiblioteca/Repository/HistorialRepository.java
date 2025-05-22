package com.example.sistemabiblioteca.Repository;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.sistemabiblioteca.persistence.entity.HistorialEntity;

public interface HistorialRepository extends CrudRepository<HistorialEntity, Long> {

    
@Query("SELECT h FROM HistorialEntity h WHERE h.idUsuario = :usuarioId")
List<HistorialEntity> findHistorialByUsuarioId(@Param("usuarioId") Long usuarioId);



@Query("SELECT h.idUsuario FROM HistorialEntity h GROUP BY h.idUsuario ORDER BY COUNT(h.idUsuario) DESC")
List<Long> findTopUsuariosConMasPrestamos(PageRequest pageable);

}
