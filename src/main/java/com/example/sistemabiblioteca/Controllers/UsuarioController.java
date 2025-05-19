package com.example.sistemabiblioteca.Controllers;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
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
import com.example.sistemabiblioteca.Model.UsuarioLoginDTO;
import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.Repository.UsuarioEntityRepository;
import com.example.sistemabiblioteca.Repository.UsuarioRepository;
import com.example.sistemabiblioteca.Service.UsuarioService;
import com.example.sistemabiblioteca.persistence.entity.CreateRoleRequest;
import com.example.sistemabiblioteca.persistence.entity.PermissionsEntity;
import com.example.sistemabiblioteca.persistence.entity.RoleEntity;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;


@RequestMapping("/user")
@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
     private final UsuarioService service;
    
     @Autowired
     private UsuarioRepository usuarioRepository;

     @Autowired
     private UsuarioEntityRepository usuarioEntityRepository;

    public UsuarioController(UsuarioService service) {
        this.service = service;
        
        
    }

    @GetMapping("/home")
    @ResponseBody
    public String home(){
        return "hola desde controlador usuario";
    }

    //este metodo sirve para ver todos los usuarios registrados
    @GetMapping("/all")
    @ResponseBody
    public Iterable<UserEntity> getAllUsers() {
        return service.obtenerUsuarios();
    }

    @GetMapping("/rol")
    @ResponseBody
     public Optional<UserEntity> getUser(@RequestParam String username) {
        return service.getUserByUsernameAndRole(username);
    }

    @GetMapping("/roles")
    @ResponseBody
    public Iterable<RoleEntity> getAllRol(){
                return service.getAllRoles();
    }

    @GetMapping("/permisos")
    @ResponseBody
    public Iterable<PermissionsEntity> getAllPermissions(){
                return service.getAllPermissions();
    }

    @PostMapping(path = "/registrar" ,consumes = "application/json", produces = "application/json")
     public ResponseEntity<UserEntity> addUser(@RequestBody UsuarioLoginDTO dto) {
        try {
            // Llamamos al servicio para guardar el usuario
            UserEntity savedUser = service.guardarUsuario(dto);
            return ResponseEntity.ok(savedUser); // Respondemos con el usuario guardado
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // En caso de error, respondemos con 400
        }
    }
    
    //obtiene los usuarios por el id
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserId(@PathVariable Long id){
        
        UserEntity userFindId = service.obtenerUsuarioId(id);
        return ResponseEntity.ok(userFindId);
    }
     @PutMapping("/{id}")
    public ResponseEntity<UserEntity> upDateUser(@PathVariable Long id, @RequestBody UserEntity userEntity){
        
       
       UserEntity userUpdated = service.actualizarUsuario(id, userEntity);
        return ResponseEntity.ok(userUpdated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        service.eliminarUsuario(id); // Método que debes tener en el servicio
        return ResponseEntity.noContent().build(); // HTTP 204 sin contenido
    }

    @GetMapping("/username/{username}")
public ResponseEntity<?> getUsuarioByUsername(@PathVariable String username) {
    Optional<UserEntity> usuarioOpt = usuarioEntityRepository.findUserEntityByUsername(username);
    if (usuarioOpt.isPresent()) {
        return ResponseEntity.ok(usuarioOpt.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
}
   
 

    
    
    
}
