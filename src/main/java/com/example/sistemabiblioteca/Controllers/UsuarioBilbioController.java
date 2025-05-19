package com.example.sistemabiblioteca.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.sistemabiblioteca.Model.ActualizarBibliotecarioDTO;
import com.example.sistemabiblioteca.Model.ActualizarDocenteDTO;
import com.example.sistemabiblioteca.Model.ActualizarEstudianteDTO;
import com.example.sistemabiblioteca.Model.CarrerasModel;
import com.example.sistemabiblioteca.Model.EspecialidadModel;
import com.example.sistemabiblioteca.Model.FacultadModel;
import com.example.sistemabiblioteca.Model.PerfilDTO;
import com.example.sistemabiblioteca.Model.ProfesorModel;
import com.example.sistemabiblioteca.Model.RegistroCompletoDTO;
import com.example.sistemabiblioteca.Model.TipoContratoModel;
import com.example.sistemabiblioteca.Model.UsuarioExtendidoDTO;
import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.Model.UsuariosconRolesDTO;
import com.example.sistemabiblioteca.Repository.CarreraRepository;
import com.example.sistemabiblioteca.Repository.EspecialidadRepository;
import com.example.sistemabiblioteca.Repository.FacultadRepository;
import com.example.sistemabiblioteca.Repository.TipoContratoRepository;
import com.example.sistemabiblioteca.Service.UsuarioRegistroBibliotecaService;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;

@RequestMapping("/user_biblio")
@Controller
@CrossOrigin(origins = "*")
public class UsuarioBilbioController {


    private final UsuarioRegistroBibliotecaService usuarioBilbioService;
    private final CarreraRepository carreraRepository;
    private final FacultadRepository facultadRepository;

    @Autowired
    private TipoContratoRepository tipoContratoRepository;

    @Autowired
    private EspecialidadRepository especialidadRepository;


    public UsuarioBilbioController(UsuarioRegistroBibliotecaService usuarioBilbioService,CarreraRepository carreraRepository,FacultadRepository facultadRepository){
        this.usuarioBilbioService = usuarioBilbioService;
        this.carreraRepository = carreraRepository;
        this.facultadRepository = facultadRepository;
    }

     @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(usuarioBilbioService.getUserCount());
    }
   @PostMapping("/registrar")
   @ResponseBody
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroCompletoDTO dto) {
   try {
        Map<String, Object> respuesta = usuarioBilbioService.RegisterUserBiblio(dto);
        return ResponseEntity.ok(respuesta);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
    }
}

    // Endpoint para obtener todas las carreras
    @GetMapping("/carreras")
    public ResponseEntity<Iterable<CarrerasModel>> obtenerCarreras() {
        Iterable<CarrerasModel> carreras = carreraRepository.findAll();
        return ResponseEntity.ok(carreras);
    }

    //traemos el listado de facultades
    @GetMapping("/facultad")
    public ResponseEntity<Iterable<FacultadModel>> obtenerFacultades() {
        Iterable<FacultadModel> facultad = facultadRepository.findAll();
        return ResponseEntity.ok(facultad);
    }

    //traemos el listado de tipo de contratos
      @GetMapping("/contrato_all")
    public ResponseEntity<Iterable<TipoContratoModel>> obtenerTipoContrato() {
        Iterable<TipoContratoModel> tipo = tipoContratoRepository.findAll();
        return ResponseEntity.ok(tipo);
    }

    @GetMapping("/especialidad_all")
    public ResponseEntity<Iterable<EspecialidadModel>> obtenerEspecialidad(){
        Iterable<EspecialidadModel> especialidad = especialidadRepository.findAll();
        return ResponseEntity.ok(especialidad);
    }
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    

    //obtener todos los expedientes de los usuarios 
    @GetMapping("/all")
    @ResponseBody
     public ResponseEntity<List<UsuariosconRolesDTO>> obtenerTodosUsuariosConRoles() {
   
    return ResponseEntity.ok(usuarioBilbioService.obtenerUsuariosConRoles());
}

    //eliminamos el usuario por el id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserBiblio(@PathVariable Long id) {
        usuarioBilbioService.eliminarUsuario(id); // Método que debes tener en el servicio
        return ResponseEntity.noContent().build(); // HTTP 204 sin contenido
    }

    //hacemos una busqueda por el id del usuario
     @GetMapping("/{id}")
    public ResponseEntity<UsuarioExtendidoDTO> getUsuarioExtendido(@PathVariable Long id) {
            UsuarioExtendidoDTO dto = usuarioBilbioService.obtenerUsuarioId(id);
            return ResponseEntity.ok(dto);
        }

    //endpoint para actualizar el estudiante
    @PutMapping("/update_user_student")
    public ResponseEntity<UsuarioModel> actualizarEstudiante(@RequestBody ActualizarEstudianteDTO dto) {
        UsuarioModel actualizado = usuarioBilbioService.actualizarEstudianteYUsuario(dto);
        return ResponseEntity.ok(actualizado);
    }

     //endpoint para actualizar el estudiante
    @PutMapping("/update_user_bibliotecario")
    public ResponseEntity<UsuarioModel> actualizarBibliotecario(@RequestBody ActualizarBibliotecarioDTO dto) {
        UsuarioModel actualizado = usuarioBilbioService.actualizarEstudianteYBibliotecario(dto);
        return ResponseEntity.ok(actualizado);
    }

    @PutMapping("/update_user_docente")
    public ResponseEntity<UsuarioModel> actualizarDocente(@RequestBody ActualizarDocenteDTO dto) {
        //TODO: process PUT request
        UsuarioModel actualizado = usuarioBilbioService.actualizarDocenteUsuario(dto);
        return ResponseEntity.ok(actualizado);
        
       
    }

    
    @GetMapping("/perfil/{id}")
    public ResponseEntity<PerfilDTO> obtenerPerfil(@PathVariable("id") Long idusuario) {
        PerfilDTO perfil = usuarioBilbioService.obtenerPerfil(idusuario);
        if (perfil == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(perfil);
    }

     @GetMapping("/get_student/{id}")
    public ResponseEntity<ActualizarEstudianteDTO> obtenerEstudiante(@PathVariable Long id) {
        ActualizarEstudianteDTO dto = usuarioBilbioService.ObtenerEstudianteporUsuarioId(id);
        return ResponseEntity.ok(dto);
    }
      @GetMapping("/get_bibliotecario/{id}")
    public ResponseEntity<ActualizarBibliotecarioDTO> obtenerBibliotecario(@PathVariable Long id) {
        ActualizarBibliotecarioDTO dto = usuarioBilbioService.ObtenerBibliotecarioporUsuarioId(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/get_docente/{id}")
    public ResponseEntity<ActualizarDocenteDTO> obtenerDocente(@PathVariable Long id) {
        ActualizarDocenteDTO dto = usuarioBilbioService.ObtenerDocentePorUsuarioId(id);
        return ResponseEntity.ok(dto);
    }

     @PutMapping("/renovar/{id}/carnet")
    public ResponseEntity<?> renovarCarnet(@PathVariable Long id) {
        usuarioBilbioService.renovarCarnetYMembership(id);
         return ResponseEntity.ok(Map.of("mensaje", "Carnet y membresía renovados por 1 año"));
    }
    

   

}
