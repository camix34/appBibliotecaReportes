package com.example.sistemabiblioteca.Controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.sistemabiblioteca.Model.PrestamoMultaDTO;
import com.example.sistemabiblioteca.Repository.MaterialRepository;
import com.example.sistemabiblioteca.Service.PrestamoService;
import com.example.sistemabiblioteca.persistence.entity.MaterialEntity;

import jakarta.persistence.criteria.Path;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class MaterialController {
    @Autowired

    private MaterialRepository materialRepository;

    // Endpoint para obtener todos los idiomas
    @GetMapping("/materiales")
    public List<MaterialEntity> listarTodasLasCategorias() {
        return (List<MaterialEntity>) materialRepository.findAll();
    }

    // metodo para guardar un Material
    @PostMapping("/materiales")
    public MaterialEntity guardarMateriales(@RequestBody MaterialEntity material) {
        return materialRepository.save(material);
    }

    // Metodo para buscar idioma por id
    @GetMapping("/materiales/{id}")
    public ResponseEntity<MaterialEntity> obtenerMaterialPorId(@PathVariable Long id) {
        MaterialEntity material = materialRepository.findById(id).orElse(null);
        if (material != null) {
            return ResponseEntity.ok(material);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Metodo para actualizar idioma por id

    @PutMapping("/materiales/{id}")
    public ResponseEntity<MaterialEntity> actualizarMaterial(@PathVariable Long id,
            @RequestBody MaterialEntity materialActualizado) {
        MaterialEntity materialExistente = materialRepository.findById(id).orElse(null);
        if (materialExistente != null) {
            materialExistente.setTitulo(materialActualizado.getTitulo());
            materialExistente.setAutor(materialActualizado.getAutor());
            materialExistente.setANIOPUBLICACION(materialActualizado.getANIOPUBLICACION());
            materialExistente.setTIPOMATERIAL(materialActualizado.getTIPOMATERIAL());
            materialExistente.setSTOCKDISPONIBLE(materialActualizado.getSTOCKDISPONIBLE());
            materialExistente.setImagen_portada(materialActualizado.getImagen_portada());
            materialExistente.setIdCategoria(materialActualizado.getIdCategoria());
            materialExistente.setIdIdioma(materialActualizado.getIdIdioma());
            MaterialEntity materialGuardado = materialRepository.save(materialActualizado);
            return ResponseEntity.ok(materialGuardado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // metodo para eliminar una categoria
    @DeleteMapping("/materiales/{id}")
    public ResponseEntity<Void> eliminarMaterial(@PathVariable Long id) {
        if (materialRepository.existsById(id)) {
            materialRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/materiales/upload")
    public ResponseEntity<Map<String, String>> subirImagen(@RequestParam("archivo") MultipartFile archivo) {
        if (archivo.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Archivo vacío"));
        }

        try {
            // Carpeta donde guardarás la imagen
            String carpetaDestino = "src/main/resources/static/saveImage/";
            String nombreArchivo = archivo.getOriginalFilename();
            java.nio.file.Path rutaGuardado = Paths.get(carpetaDestino + nombreArchivo);

            // Crea carpeta si no existe
            Files.createDirectories(Paths.get(carpetaDestino));

            // Guarda la imagen
            Files.copy(archivo.getInputStream(), rutaGuardado, StandardCopyOption.REPLACE_EXISTING);

            // Retorna la URL pública de la imagen
            String urlImagen = "/saveImage/" + nombreArchivo;
            return ResponseEntity.ok().body(Map.of("url", urlImagen));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al guardar: " + e.getMessage()));
        }
    }

    @Autowired
    private PrestamoService prestamoService;


    //metodo para hacer un prestamo
    @PostMapping("materiales/{materialId}/borrow/{usuarioId}")
    public ResponseEntity<Map<String, String>> prestarMaterial(
            @PathVariable Long materialId,
            @PathVariable Long usuarioId) {

        prestamoService.prestarMaterial(materialId, usuarioId);

        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Material prestado con éxito");

        return ResponseEntity.ok(response);
    }

    //metodo no usado para devolver el material
    @DeleteMapping("/materiales/{materialid}/return/{usuarioid}")
    public ResponseEntity<String> devolverMaterial(@PathVariable Long materialid, @PathVariable Long usuarioid) {
        try {
            prestamoService.devolverMaterial(materialid, usuarioid);
            return ResponseEntity.ok("Material devuelto exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

   

}
