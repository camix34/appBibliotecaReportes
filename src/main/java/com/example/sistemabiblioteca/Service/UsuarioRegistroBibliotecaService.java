package com.example.sistemabiblioteca.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.sistemabiblioteca.Model.ActualizarBibliotecarioDTO;
import com.example.sistemabiblioteca.Model.ActualizarDocenteDTO;
import com.example.sistemabiblioteca.Model.ActualizarEstudianteDTO;
import com.example.sistemabiblioteca.Model.BibliotecarioModel;
import com.example.sistemabiblioteca.Model.CarrerasModel;
import com.example.sistemabiblioteca.Model.EspecialidadModel;
import com.example.sistemabiblioteca.Model.EstudianteModel;
import com.example.sistemabiblioteca.Model.FacultadModel;
import com.example.sistemabiblioteca.Model.MembresiaModel;
import com.example.sistemabiblioteca.Model.PerfilDTO;
import com.example.sistemabiblioteca.Model.ProfesorModel;
import com.example.sistemabiblioteca.Model.RegistroCompletoDTO;
import com.example.sistemabiblioteca.Model.RoleDTO;
import com.example.sistemabiblioteca.Model.TipoContratoModel;
import com.example.sistemabiblioteca.Model.UsuarioExtendidoDTO;
import com.example.sistemabiblioteca.Model.UsuarioLoginDTO;
import com.example.sistemabiblioteca.Model.UsuarioModel;
import com.example.sistemabiblioteca.Model.UsuariosconRolesDTO;
import com.example.sistemabiblioteca.Repository.*;
import com.example.sistemabiblioteca.persistence.entity.RoleEntity;
import com.example.sistemabiblioteca.persistence.entity.UserEntity;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


@Service
public class UsuarioRegistroBibliotecaService {

        @Autowired
        private EstudianteRepository estudianteRepository;

        @Autowired
        private EspecialidadRepository especialidadRepository;

        @Autowired
        private ProfesorRepository profesorRepository;
        
        @Autowired
        private BibliotecarioRepository bibliotecarioRepository;

        @Autowired
        private  UsuarioRepository usuariomodelRepository;

        @Autowired
        private UsuarioRepositoryCustom usuarioRepositoryCustom;

        @Autowired
        private  RoleRepository roleRepository;

        @Autowired
        private  UsuarioEntityRepository usuarioEntityRepository;

        @Autowired
        private  CarreraRepository carreraRepository;
        @Autowired
        private  FacultadRepository facultadRepository;

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private TipoContratoRepository contratoRepository;

        @Autowired
        private MembresiaRepository membresiaRepository;

    UsuarioRegistroBibliotecaService() {
        
    }

        
       
       

        //servicio para registrar un usuario de la bilbioteca
       @Transactional
    public  Map<String, Object> RegisterUserBiblio(RegistroCompletoDTO dto) throws Exception {

        // 1. Generar carnet
    String carnet = generarCarnet(dto.getApellido1(), dto.getApellido2());

         // 2. Crear y guardar el usuario
    UsuarioModel usuario = new UsuarioModel();
    usuario.setCarnet(carnet);
    usuario.setNombre(dto.getNombre());
    usuario.setApellido1(dto.getApellido1());
    usuario.setApellido2(dto.getApellido2());
    usuario.setEmail(dto.getEmail());
    usuario.setTelefono(dto.getTelefono());
    usuario.setTipo(dto.getTipo());
    usuario.setDireccion(dto.getDireccion());
    usuario.setFecha_registro(Date.valueOf(LocalDate.now()));

    // Guardar usuario en la base de datos
    usuario = usuariomodelRepository.save(usuario);

    // 3. Si es estudiante, crear y guardar EstudianteModel
    if ("ESTUDIANTE".equalsIgnoreCase(dto.getTipo())) {
        FacultadModel facultad = facultadRepository.findById(dto.getFacultadId())
            .orElseThrow(() -> new RuntimeException("Facultad no encontrada"));

        CarrerasModel carrera = carreraRepository.findById(dto.getCarreraId())
            .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

        EstudianteModel estudiante = new EstudianteModel();
        estudiante.setUsuario(usuario); // Establece la relación
        estudiante.setFacultad(facultad);
        estudiante.setCarrera(carrera);

        // Guardar el estudiante — importante: el usuario ya está guardado
        estudianteRepository.save(estudiante);
    }
    if("BIBLIOTECARIO".equalsIgnoreCase(dto.getTipo())){

        TipoContratoModel tipocontrato = contratoRepository.findById(dto.getContrato_id())
                    .orElseThrow(() -> new RuntimeException("Contrato no encontrado"));
        BibliotecarioModel bibliotecarioModel = new BibliotecarioModel();

        bibliotecarioModel.setUsuario(usuario);
        bibliotecarioModel.setContrato_id(tipocontrato);
        bibliotecarioModel.setArea(dto.getArea());
        bibliotecarioModel.setDui(dto.getDui());

        //guardamos el bibliotecario
        bibliotecarioRepository.save(bibliotecarioModel);
    
    }if("DOCENTE".equalsIgnoreCase(dto.getTipo())){
        EspecialidadModel especialidad = especialidadRepository.findById(dto.getEspecialidad())
                    .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));

        FacultadModel facultad = facultadRepository.findById(dto.getFacultadId())
            .orElseThrow(() -> new RuntimeException("Facultad no encontrada"));

            //obtenemos los tipo de contrato
        TipoContratoModel tipocontrato = contratoRepository.findById(dto.getContrato_id())
                    .orElseThrow(() -> new RuntimeException("Contrato no encontrado"));

        ProfesorModel profesorModel = new ProfesorModel();
        profesorModel.setUsuario(usuario);
        profesorModel.setIdFacultad(facultad);
        profesorModel.setContrato_id(tipocontrato);
        profesorModel.setEspecialidad(especialidad);
        profesorModel.setDui(dto.getDui());
            
        //guardamos el docente
        profesorRepository.save(profesorModel);
      
    }
    else if (!"ESTUDIANTE".equalsIgnoreCase(dto.getTipo()) && !"BIBLIOTECARIO".equalsIgnoreCase(dto.getTipo())&&!"DOCENTE".equalsIgnoreCase(dto.getTipo())) {
    throw new IllegalArgumentException("Tipo de usuario no válido: " + dto.getTipo());
            }
    
    // 4. Respuesta
    Map<String, Object> respuesta = new HashMap<>();
    respuesta.put("carnet", carnet);
    respuesta.put("idUsuario", usuario.getIdusuario());

    return respuesta;
    }


        //metodo para generar un carnet unico
        private String generarCarnet(String apellido1, String apellido2) {
            String a1 = (apellido1 == null || apellido1.isEmpty()) ? "X" : apellido1.substring(0, 1).toUpperCase();
            String a2 = (apellido2 == null || apellido2.isEmpty()) ? "X" : apellido2.substring(0, 1).toUpperCase();
            
            // Obtener los dos últimos dígitos del año actual
            String year = String.valueOf(LocalDate.now().getYear()).substring(2); // Ej. "2025" → "25"
            
            int secuencia = (int) (Math.random() * 900 + 100); // Número aleatorio de 3 cifras: 100-999

            return a1 + a2 + year + secuencia;
        }

     // Método para obtener todos los usuarios con roles
    public List<UsuariosconRolesDTO> obtenerUsuariosConRoles() {
    List<UsuarioModel> usuarios = usuarioRepository.findAll();
    List<UsuariosconRolesDTO> resultado = new ArrayList<>();

    for (UsuarioModel usuario : usuarios) {
        Set<RoleEntity> roles = new HashSet<>();
        if (usuario.getUserEntity() != null) {
            roles = usuario.getUserEntity().getRoles();
        }

        List<String> nombresRoles = new ArrayList<>();
        for (RoleEntity rol : roles) {
            nombresRoles.add(rol.getRoleEnum().name());
        }

        // Obtener estudiante (si existe)
        Optional<EstudianteModel> estudianteOpt = estudianteRepository.findByUsuario(usuario);
        CarrerasModel carrera = null;
        FacultadModel facultad = null;

        if (estudianteOpt.isPresent()) {
            EstudianteModel estudiante = estudianteOpt.get();
            carrera = estudiante.getCarrera();
            facultad = estudiante.getFacultad();
        }

        // Obtener bibliotecario (si existe)
Optional<BibliotecarioModel> biblioOpt = bibliotecarioRepository.findByUsuario(usuario);
        String area = null;
        String dui = null;
        TipoContratoModel tipoContrato = null;

        if (biblioOpt.isPresent()) {
            BibliotecarioModel biblio = biblioOpt.get();
            area = biblio.getArea();
            dui = biblio.getDui();
            tipoContrato = biblio.getContrato_id();
        }

        Optional<ProfesorModel> profesorOpt = profesorRepository.findByUsuario(usuario);
        EspecialidadModel especialidad = null;
        if(profesorOpt.isPresent()){
            ProfesorModel profe = profesorOpt.get();
            facultad = profe.getIdFacultad();
            especialidad = profe.getEspecialidad();
            tipoContrato = profe.getContrato_id();
        }
         Optional<MembresiaModel> membresiaOpt = membresiaRepository.findByUsuarioAndEstado(usuario, 1);

        UsuariosconRolesDTO dto = new UsuariosconRolesDTO(
            usuario.getIdusuario(),
            usuario.getCarnet(),
            usuario.getNombre(),
            usuario.getApellido1(),
            usuario.getApellido2(),
            usuario.getEmail(),
            usuario.getTelefono(),
            usuario.getTipo(),
            usuario.getDireccion(),
            usuario.getFecha_registro(),
            carrera,
            facultad,
            nombresRoles
        );

        // Si el usuario es bibliotecario, setear datos extra
        dto.setArea(area);
        dto.setDui(dui);
        dto.setContrato_id(tipoContrato);
        
        //si el usuario es docente
        dto.setEspecialidad(especialidad);

          // datos de membresía
                    if (membresiaOpt.isPresent()) {
                        MembresiaModel membresia = membresiaOpt.get();
                        dto.setFechainicio(membresia.getFechaInicio());
                        dto.setFechafin(membresia.getFechaFin());
                        dto.setEstadoMembresia(membresia.getEstado());
                    }
        resultado.add(dto);
    }

    return resultado;
}
     
    

  //metodo para eliminar un usuario
    @Transactional
    public void eliminarUsuario(Long idUsuario) {
        if (usuarioRepository.existsById(idUsuario)) {

            // Obtener el usuario
            UsuarioModel usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuario con ID " + idUsuario + " no encontrado"));

            // Buscar estudiante asociado
            Optional<EstudianteModel> estudianteOpt = estudianteRepository.findByUsuario(usuario);
            estudianteOpt.ifPresent(estudianteRepository::delete); // Si existe, elimínalo

            // Buscar UserEntity asociado
            Optional<UserEntity> userEntityOpt = usuarioEntityRepository.findByUsuario(usuario);
            userEntityOpt.ifPresent(usuarioEntityRepository::delete); // Si existe, elimínalo

            // Eliminar usuario
            usuarioRepository.delete(usuario);

        } else {
            throw new EntityNotFoundException("Usuario con ID " + idUsuario + " no encontrado");
        }
    }

     public PerfilDTO obtenerPerfil(Long idusuario) {
        return usuarioRepositoryCustom.obtenerPerfilPorId(idusuario);
    }
    
    //muestra la cantidad de usuarios registrados
  public long getUserCount() {
        return usuarioRepository.count();
    }

     //metodo para buscar un usuario por el id
        public UsuarioExtendidoDTO  obtenerUsuarioId(Long idusuario) {
              // Obtener UsuarioModel con su UserEntity
        UsuarioModel usuario = usuarioRepository.findByIdusuario(idusuario)
                                                 .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserEntity userEntity = usuarioEntityRepository.findByUsuario(usuario)
                                                    .orElseThrow(() -> new RuntimeException("UserEntity no encontrado"));
        
      

        // Convertir roles de UserEntity a RoleDTO
        List<RoleDTO> roleDTOs = userEntity.getRoles().stream()
                                           .map(role -> new RoleDTO(role.getRoleEnum().toString()))
                                           .collect(Collectors.toList());

        // Crear y devolver el DTO
        return new UsuarioExtendidoDTO(
                usuario.getIdusuario(),
                usuario.getCarnet(),
                usuario.getNombre(),
                usuario.getApellido1(),
                usuario.getApellido2(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.getTipo(),
                usuario.getDireccion(),
                usuario.getFecha_registro(),
                userEntity.getUsername(),
                userEntity.isEnabled(),

                roleDTOs
        );
            }

        //metodo para actualizar informacion del estudiante
         public UsuarioModel actualizarEstudianteYUsuario(ActualizarEstudianteDTO dto) {
                // Obtener usuario
                UsuarioModel usuario = usuarioRepository.findById(dto.getIdusuario())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                // Actualizar datos del usuario
                usuario.setNombre(dto.getNombre());
                usuario.setApellido1(dto.getApellido1());
                usuario.setApellido2(dto.getApellido2());
                usuario.setEmail(dto.getEmail());
                usuario.setTelefono(dto.getTelefono());
                usuario.setDireccion(dto.getDireccion());

                // Obtener estudiante asociado
                EstudianteModel estudiante = estudianteRepository.findByUsuario(usuario)
                        .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

                // Actualizar carrera y facultad
                CarrerasModel carrera = carreraRepository.findById(dto.getIdCarrera())
                        .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

                FacultadModel facultad = facultadRepository.findById(dto.getIdFacultad())
                        .orElseThrow(() -> new RuntimeException("Facultad no encontrada"));

                estudiante.setCarrera(carrera);
                estudiante.setFacultad(facultad);

                estudianteRepository.save(estudiante); // persistimos estudiante
                return usuarioRepository.save(usuario); // persistimos usuario actualizado
    }

    public UsuarioModel actualizarEstudianteYBibliotecario(ActualizarBibliotecarioDTO dto){
              // Obtener usuario
                UsuarioModel usuario = usuarioRepository.findById(dto.getIdusuario())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                
                // Actualizar datos del usuario
                usuario.setNombre(dto.getNombre());
                usuario.setApellido1(dto.getApellido1());
                usuario.setApellido2(dto.getApellido2());
                usuario.setEmail(dto.getEmail());
                usuario.setTelefono(dto.getTelefono());
                usuario.setDireccion(dto.getDireccion());

                BibliotecarioModel bibliotecarioModel = bibliotecarioRepository.findByUsuario(usuario)
                        .orElseThrow(() -> new RuntimeException("Bibliotecario no encontrado"));

               

                bibliotecarioModel.setArea(dto.getArea());
                bibliotecarioModel.setDui(dto.getDui());
                bibliotecarioRepository.save(bibliotecarioModel);

                return usuarioRepository.save(usuario);
    }

    public UsuarioModel actualizarDocenteUsuario(ActualizarDocenteDTO dto){
          UsuarioModel usuario = usuarioRepository.findById(dto.getIdusuario())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

             // Actualizar datos del usuario
                usuario.setNombre(dto.getNombre());
                usuario.setApellido1(dto.getApellido1());
                usuario.setApellido2(dto.getApellido2());
                usuario.setEmail(dto.getEmail());
                usuario.setTelefono(dto.getTelefono());
                usuario.setDireccion(dto.getDireccion());

                ProfesorModel profesorModel = profesorRepository.findByUsuario(usuario)
                    .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

                 EspecialidadModel especialidadModel = especialidadRepository.findById(dto.getEspecialidad_id())
                 .orElseThrow(()->new RuntimeException("especialidad no encontrada"));

                  FacultadModel facultadModel = facultadRepository.findById(dto.getIdFacultad())
                 .orElseThrow(()->new RuntimeException("facultad no encontrada"));


                profesorModel.setEspecialidad(especialidadModel);
                profesorModel.setIdFacultad(facultadModel);
                profesorModel.setDui(dto.getDui());

                return usuarioRepository.save(usuario);
    }

    public ActualizarEstudianteDTO ObtenerEstudianteporUsuarioId(Long idUsuario){

         UsuarioModel usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        EstudianteModel estudiante = estudianteRepository.findByUsuario(usuario)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

            ActualizarEstudianteDTO dto = new ActualizarEstudianteDTO();
             dto.setIdusuario(usuario.getIdusuario());
             dto.setNombre(usuario.getNombre());
             dto.setApellido1(usuario.getApellido1());
             dto.setApellido2(usuario.getApellido2());
             dto.setEmail(usuario.getEmail());
             dto.setTelefono(usuario.getTelefono());
             dto.setIdFacultad(estudiante.getFacultad().getId());
             dto.setDireccion(usuario.getDireccion());
             dto.setIdCarrera(estudiante.getCarrera().getId());

        return dto;
      
    }

    public ActualizarBibliotecarioDTO ObtenerBibliotecarioporUsuarioId(Long idUsuario){

              UsuarioModel usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            BibliotecarioModel bibliotecarioModel = bibliotecarioRepository.findByUsuario(usuario)
            .orElseThrow(() -> new RuntimeException("Bibliotecario no encontrado"));

            ActualizarBibliotecarioDTO bibliotecarioDTO = new ActualizarBibliotecarioDTO();
            bibliotecarioDTO.setIdusuario(usuario.getIdusuario());
            bibliotecarioDTO.setNombre(usuario.getNombre());
            bibliotecarioDTO.setApellido1(usuario.getApellido1());
            bibliotecarioDTO.setApellido2(usuario.getApellido2());
            bibliotecarioDTO.setEmail(usuario.getEmail());
            bibliotecarioDTO.setTelefono(usuario.getTelefono());
            bibliotecarioDTO.setDireccion(usuario.getDireccion());
            bibliotecarioDTO.setContrato_id(bibliotecarioModel.getContrato_id().getIdContrato());
            bibliotecarioDTO.setArea(bibliotecarioModel.getArea());
            bibliotecarioDTO.setDui(bibliotecarioModel.getDui());
            
            return bibliotecarioDTO;
    
        }

        public ActualizarDocenteDTO ObtenerDocentePorUsuarioId(Long idUsuario){
             UsuarioModel usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            ProfesorModel profesorModel = profesorRepository.findByUsuario(usuario)
             .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

             ActualizarDocenteDTO DocenteDto = new ActualizarDocenteDTO();
            DocenteDto.setIdusuario(usuario.getIdusuario());
            DocenteDto.setNombre(usuario.getNombre());
            DocenteDto.setApellido1(usuario.getApellido1());
            DocenteDto.setApellido2(usuario.getApellido2());
            DocenteDto.setEmail(usuario.getEmail());
            DocenteDto.setTelefono(usuario.getTelefono());
            DocenteDto.setDireccion(usuario.getDireccion());
            DocenteDto.setEspecialidad_id(profesorModel.getEspecialidad().getId_especialidad());
            DocenteDto.setContrato_id(profesorModel.getContrato_id().getIdContrato());
            DocenteDto.setIdFacultad(profesorModel.getIdFacultad().getId());
            DocenteDto.setDui(profesorModel.getDui());

            return DocenteDto;
        }

            //sercicio para renovar la fecha de vencimiento de carnet y membresia
        
    public void renovarCarnetYMembership(Long idUsuario) {
     
       
        // Renovar membresía activa (estado = 1)
        MembresiaModel membresia = membresiaRepository.findByUsuario_IdusuarioAndEstado(idUsuario, 1L);
        if (membresia != null) {
            membresia.setFechaInicio(Date.valueOf(LocalDate.now()));
            membresia.setFechaFin(Date.valueOf(LocalDate.now().plusYears(1)));
            membresiaRepository.save(membresia);
        }
    }

}
