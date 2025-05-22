package com.example.sistemabiblioteca.Repository;

import java.math.BigDecimal;
import org.springframework.stereotype.Repository;
import com.example.sistemabiblioteca.Model.PerfilDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UsuarioRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

   public PerfilDTO obtenerPerfilPorId(Long idusuario) {
    String sql = "SELECT u.idusuario, u.carnet, u.nombre, u.apellido1, u.apellido2, u.email, " +
        "u.telefono, u.tipo, u.direccion, ur.nombreusuario, " +
        "e.idcarrera, c.nombre AS nombre_carrera, e.idfacultad, " +
        "p.especialidad_id, p.facultad_id, p.dui, " +
        "b.area, b.dui " +
        "FROM usuario u " +
        "LEFT JOIN usuarios_registrados ur ON u.idusuario = ur.usuario_id " +
        "LEFT JOIN estudiante e ON u.idusuario = e.idusuario " +
        "LEFT JOIN carreras c ON e.idcarrera = c.id_carrera " +
        "LEFT JOIN profesor p ON u.idusuario = p.idusuario " +
        "LEFT JOIN bibliotecario b ON u.idusuario = b.idusuario " +
        "WHERE u.idusuario = :id";

    Object[] result = (Object[]) entityManager.createNativeQuery(sql)
        .setParameter("id", idusuario)
        .getSingleResult();

    if (result.length < 10) {
        throw new IllegalStateException("La consulta SQL no devolvió la cantidad mínima de columnas.");
    }

    PerfilDTO dto = new PerfilDTO();
    
    // Conversión segura de tipos numéricos
    dto.setIdusuario(convertToLong(result[0]));
    dto.setCarnet((String) result[1]);
    dto.setNombre((String) result[2]);
    dto.setApellido1((String) result[3]);
    dto.setApellido2((String) result[4]);
    dto.setEmail((String) result[5]);
    dto.setTelefono((String) result[6]);
    String tipo = (String) result[7];
    dto.setTipo(tipo);
    dto.setDireccion((String) result[8]);
    dto.setUsername((String) result[9]);

    if ("ESTUDIANTE".equalsIgnoreCase(tipo)) {
        dto.setCarrera(convertToLong(result[10]));
        dto.setNombreCarrera((String) result[11]);
        dto.setFacultad(convertToLong(result[12]));
        dto.setDepartamento(dto.getFacultad());
    } else if ("DOCENTE".equalsIgnoreCase(tipo)) {
        dto.setEspecialidad(convertToLong(result[13]));
        dto.setFacultad(convertToLong(result[14]));
        dto.setDepartamento(dto.getFacultad());
        dto.setDui((String) result[15]);
    } else if ("BIBLIOTECARIO".equalsIgnoreCase(tipo)) {
        dto.setArea((String) result[16]);
        dto.setDui((String) result[17]);
    }

    return dto;
}

// Método auxiliar para conversión segura de tipos numéricos
private Long convertToLong(Object value) {
    if (value == null) {
        return null;
    }
    if (value instanceof BigDecimal) {
        return ((BigDecimal) value).longValue();
    }
    if (value instanceof Long) {
        return (Long) value;
    }
    if (value instanceof Integer) {
        return ((Integer) value).longValue();
    }
    throw new IllegalArgumentException("No se puede convertir " + value.getClass() + " a Long");
}
}
