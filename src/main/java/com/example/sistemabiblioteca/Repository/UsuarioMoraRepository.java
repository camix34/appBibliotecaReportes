package com.example.sistemabiblioteca.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.antlr.v4.runtime.atn.SemanticContext.OR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.sistemabiblioteca.persistence.entity.Usuarios_MoraEntity;

@Repository
public interface UsuarioMoraRepository extends JpaRepository<Usuarios_MoraEntity,Long>{
        Optional<Usuarios_MoraEntity> findByIdMulta(Long idMulta);
          boolean existsByIdUsuario(Long idUsuario);
      
@Query("""
SELECT CASE WHEN COUNT(um) > 0 THEN true ELSE false END
FROM Usuarios_MoraEntity um
JOIN um.multa m
JOIN m.prestamo p
WHERE p.usuario.id = :id_usuario
  AND um.estadoPenalizacion = 1
  AND (um.fechaFin IS NULL OR um.fechaFin > CURRENT_DATE)
""")
boolean existsMoraActivaByUsuarioId(@Param("id_usuario") Long id_usuario);


    void deleteByIdMultaIn(List<Long> idMultas);
}
