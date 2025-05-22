package com.example.sistemabiblioteca.Controllers;

import java.security.Identity;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sistemabiblioteca.Repository.IdiomaRepository;
import com.example.sistemabiblioteca.persistence.entity.IdiomaEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class IdiomaController {

    @Autowired

    private IdiomaRepository idiomaRepository;

    // Endpoint para obtener todos los idiomas
    @GetMapping("/idiomas")
    public List<IdiomaEntity> listarTodosLosIdiomas() {
        return (List<IdiomaEntity>) idiomaRepository.findAll();
    }


    //metodo para guardar un idioma
    @PostMapping("/idiomas")
    public IdiomaEntity guardarIdioma(@RequestBody IdiomaEntity idioma) {
        return idiomaRepository.save(idioma);
    }
    
    // Metodo para buscar idioma por id
    @GetMapping("/idiomas/{id}")
    public ResponseEntity<IdiomaEntity> obtenerIdiomaPorId(@PathVariable Long id) {
        IdiomaEntity idioma = idiomaRepository.findById(id).orElse(null);
        if (idioma != null) {
            return ResponseEntity.ok(idioma);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Metodo para actualizar idioma por id

    @PutMapping("/idiomas/{id}")
    public ResponseEntity<IdiomaEntity> actualizarIdioma(@PathVariable Long id, @RequestBody IdiomaEntity idiomaActualizado) {
        IdiomaEntity idiomaExistente = idiomaRepository.findById(id).orElse(null);
        if (idiomaExistente != null) {
            idiomaExistente.setNombreIdioma(idiomaActualizado.getNombreIdioma());
            idiomaExistente.setCodigoISO(idiomaActualizado.getCodigoISO());
            IdiomaEntity idiomaGuardado = idiomaRepository.save(idiomaActualizado);
            return ResponseEntity.ok(idiomaGuardado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/idiomas/{id}")
    public ResponseEntity<Void> eliminarIdioma(@PathVariable Long id) {
        if (idiomaRepository.existsById(id)) {
            idiomaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
