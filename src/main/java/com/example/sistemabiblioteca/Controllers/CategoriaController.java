package com.example.sistemabiblioteca.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.sistemabiblioteca.Repository.CategoriaRepository;

import com.example.sistemabiblioteca.persistence.entity.Categoriaentity;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {
    
@Autowired

    private CategoriaRepository categoriaRepository;

    // Endpoint para obtener todos los idiomas
    @GetMapping("/categorias")
    public List<Categoriaentity> listarTodasLasCategorias() {
        return (List<Categoriaentity>) categoriaRepository.findAll();
    }

    
    //metodo para guardar un material
    @PostMapping("/categorias")
    public Categoriaentity guardarIdioma(@RequestBody Categoriaentity categoria) {
        return categoriaRepository.save(categoria);
    }
    
    // Metodo para buscar idioma por id
    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoriaentity> obtenerCategoriaPorId(@PathVariable Long id) {
        Categoriaentity categiria = categoriaRepository.findById(id).orElse(null);
        if (categiria != null) {
            return ResponseEntity.ok(categiria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Metodo para actualizar idioma por id

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoriaentity> actualizarCategoria(@PathVariable Long id, @RequestBody Categoriaentity categoriaActualizada) {
        Categoriaentity categoriaExistente = categoriaRepository.findById(id).orElse(null);
        if (categoriaExistente != null) {
            categoriaExistente.setNombreCategoria(categoriaActualizada.getNombreCategoria());
            categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
            Categoriaentity categoriaGuardada = categoriaRepository.save(categoriaActualizada);
            return ResponseEntity.ok(categoriaGuardada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        if (categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
