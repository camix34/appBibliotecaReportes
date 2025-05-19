package com.example.sistemabiblioteca.Service;




import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.sistemabiblioteca.Model.EstudianteModel;
import com.example.sistemabiblioteca.Model.PerfilDTO;
import com.example.sistemabiblioteca.Model.UsuarioLoginDTO;
import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.Repository.EstudianteRepository;
import com.example.sistemabiblioteca.Repository.PermissionRepository;
import com.example.sistemabiblioteca.Repository.RoleRepository;
import com.example.sistemabiblioteca.Repository.UserRepositoryJPA;
import com.example.sistemabiblioteca.Repository.UsuarioEntityRepository;
import com.example.sistemabiblioteca.Repository.UsuarioRepository;
import com.example.sistemabiblioteca.Repository.UsuarioRepositoryCustom;
import com.example.sistemabiblioteca.persistence.entity.CreateRoleRequest;
import com.example.sistemabiblioteca.persistence.entity.PermissionsEntity;
import com.example.sistemabiblioteca.persistence.entity.RoleEntity;
import com.example.sistemabiblioteca.persistence.entity.RoleEnum;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    
 
     private final UsuarioEntityRepository repoentity;
     private final UserRepositoryJPA userRepositoryJPA;
     private final RoleRepository roleRepository;
     private final PermissionRepository permisosRepository;

     

    @Autowired
    private UsuarioRepository usuarioRepository;

     @Autowired
    private UsuarioEntityRepository usuarioentityRepository;

     @Autowired
    private EstudianteRepository estudianteRepository;

     @Autowired
    private UsuarioRepositoryCustom usuarioRepositoryCustom;
   
    
    public UsuarioService(
        UsuarioEntityRepository repoentity,
         RoleRepository roleRepository, UserRepositoryJPA userRepositoryJPA,
         PermissionRepository permisosRepository
        
         ) {

       
        this.repoentity = repoentity;
        this.roleRepository = roleRepository;
        this.userRepositoryJPA = userRepositoryJPA;
        this.permisosRepository = permisosRepository;
      
      
    }

    public Iterable<UserEntity> obtenerUsuarios() {
        return repoentity.findAll();
    }

    //metodo para guardar el usuario
    public UserEntity guardarUsuario(UsuarioLoginDTO usuarioLoginDTO){

        UserEntity user = mapFromDto(usuarioLoginDTO);
        return repoentity.save(user);
    }

   
/* public UserEntity registrarDesdeDTO(UsuarioLoginDTO dto) {

        UserEntity usuario = new UserEntity();
          // Setea los datos del DTO
            usuario.setUsername(dto.getNombre());
            usuario.setPassword(dto.getPassword());

            // Busca los roles por ID
            Set<RoleEntity> roles = dto.getIdsRoles().stream()
                .map(id -> rolRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + id)))
                .collect(Collectors.toSet());

            usuario.setRoles(roles);

         
          

            // Llama al método que ya tienes para guardar
            return guardarUsuario(usuario);
    }
 */
   
      // Método para buscar un usuario por su username y rol
    // Método para buscar un usuario por su username y roleEnum
    public Optional<UserEntity> getUserByUsernameAndRole(String username) {
        // Buscar el RoleEntity correspondiente al RoleEnum
            return userRepositoryJPA.findByUsername(username);
    }

    //metodo para traer todos los roles
     public Iterable<RoleEntity> getAllRoles() {
                return roleRepository.findAll();
     }

     //metodo para traer todos los permisos
     public Iterable<PermissionsEntity> getAllPermissions() {
        return permisosRepository.findAll();
}

public ResponseEntity<UserEntity> crearUsuario(UserEntity user) {
    //encryptamos la contraseña
     
    user.setPassword(user.getPassword());

    // Si necesitas validar el username o realizar alguna otra operación, hazlo aquí
    user.setUsername(user.getUsername());

    // Asignar roles
    Set<RoleEntity> roles = user.getRoles().stream()
        .map(role -> roleRepository.findById(role.getId()).orElse(null))
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    user.setRoles(roles);

    // Guardar el usuario con la contraseña encriptada
    UserEntity usuarioGuardado = repoentity.save(user);

  

    return ResponseEntity.ok(usuarioGuardado);
 }

 //metodo para buscar un usuario por el id
public UserEntity obtenerUsuarioId(Long id) {
    return repoentity.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No existe el usuario con el id: " + id));
}

//metodo para actualizar un usuario
public UserEntity actualizarUsuario(Long id,UserEntity userDetails) {

    UserEntity user =  repoentity.findById(id)
            .orElseThrow(() -> new NoSuchElementException("No existe el usuario con el id: " + id));

              // Buscar rol por roleEnum
    Set<RoleEntity> nuevoRol = new HashSet<>();
    for (RoleEntity r : userDetails.getRoles()) {
        RoleEntity rol = roleRepository.findByRoleEnum(r.getRoleEnum())
            .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + r.getRoleEnum()));
        nuevoRol.add(rol);
    }
    
    user.setRoles(nuevoRol);
    user.setUsername(userDetails.getUsername());
    
    user.setPassword(userDetails.getPassword());
   
    UserEntity  userUpdate = repoentity.save(user);
    
    return userUpdate;
    } 


        //metodo para eliminar un usuario
        @Transactional
        public void eliminarUsuario(Long idUsuario) {
                     if (usuarioRepository.existsById(idUsuario)) {

    // Obtener el usuario para eliminarlo
    UsuarioModel usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new EntityNotFoundException("Usuario con ID " + idUsuario + " no encontrado"));

    // Buscar estudiante asociado al usuario (por su relación unidireccional)
    Optional<EstudianteModel> estudianteOpt = estudianteRepository.findByUsuario(usuario);

    if (estudianteOpt.isPresent()) {
        // Eliminar el estudiante explícitamente
        estudianteRepository.delete(estudianteOpt.get());
    }

    // Eliminar el usuario
    usuarioRepository.delete(usuario);

} else {
    throw new EntityNotFoundException("Usuario con ID " + idUsuario + " no encontrado");
}
            }
    

    //funcion para capturar los datos en orden
    public UserEntity mapFromDto(UsuarioLoginDTO dto) {
             // Obtenemos el UsuarioModel por el ID
        UsuarioModel usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Obtenemos los roles desde el DTO
        Set<RoleEntity> roles = dto.getRoles().stream()
                .map(id -> roleRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Rol no encontrado")))
                .collect(Collectors.toSet());

        // Creamos el objeto UserEntity
        return UserEntity.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .isEnabled(true)
                .accountNoExpired(true)
                .accountNolocked(true)
                .credentialNoExpired(true)
                .usuario(usuario)
                .roles(roles)
                .build();
}

  public long getUserCount() {
        return usuarioRepository.count();
    }
    
   
  
 
}
