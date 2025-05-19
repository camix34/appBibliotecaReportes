package com.example.sistemabiblioteca.Model;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter

public class UsuariosconRolesDTO {

    private Long idusuario;
    private String carnet;
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String email;
    private String telefono;
    private String tipo;
    private String direccion;
    private Date fecha_registro;
    private CarreraDTO carrera;
    private FacultadDTO facultad;

    private List<String> roles;
    private String area;
    private TipoContratoModel contrato_id;
    private String dui;

    private EspecialidadModel especialidad;

    
    private Date fechainicio;
    private Date fechafin;
    private Long estadoMembresia;

    //constructor si es bibliotecario
    public UsuariosconRolesDTO(Long idusuario, String carnet, String nombre, String apellido1, String apellido2,
            String email, String telefono, String tipo, String direccion, Date fecha_registro, List<String> roles,
            String area, String dui,TipoContratoModel contrato_id) {
        this.idusuario = idusuario;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
        this.roles = roles;
        this.area = area;
        this.dui = dui;
        this.contrato_id = contrato_id;

    }

        //constructor por si es estudiante
         public UsuariosconRolesDTO(Long idusuario, String carnet, String nombre, String apellido1, String apellido2,
            String email, String telefono, String tipo, String direccion, Date fecha_registro, CarrerasModel carreraModel,
            FacultadModel facultadModel, List<String> roles) {
        this.idusuario = idusuario;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
        this.roles = roles;
      
       

          if (carreraModel != null) {
            this.carrera = new CarreraDTO(carreraModel.getId(), carreraModel.getNombre());
        }

        if (facultadModel != null) {
            this.facultad = new FacultadDTO(facultadModel.getId(), facultadModel.getNombre());
        }
    }
        
        //constructor por si es Docente
         public UsuariosconRolesDTO(Long idusuario, String carnet, String nombre, String apellido1, String apellido2,
            String email, String telefono, String tipo, String direccion, Date fecha_registro,FacultadModel facultadModel,
            EspecialidadModel especialidad, List<String> roles, TipoContratoModel contrato_id) {
        this.idusuario = idusuario;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.direccion = direccion;
        this.fecha_registro = fecha_registro;
        this.roles = roles;
        this.contrato_id = contrato_id;
        this.especialidad = especialidad;

        if (facultadModel != null) {
            this.facultad = new FacultadDTO(facultadModel.getId(), facultadModel.getNombre());
        }
       
    }
    public UsuariosconRolesDTO(Long idusuario, String carnet, String nombre, String apellido1, String apellido2,
    String email, String telefono, String tipo, String direccion, Date fecha_registro,
    CarreraDTO carrera, FacultadDTO facultad, List<String> roles) {
    
    this.idusuario = idusuario;
    this.carnet = carnet;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.email = email;
    this.telefono = telefono;
    this.tipo = tipo;
    this.direccion = direccion;
    this.fecha_registro = fecha_registro;
    this.carrera = carrera;
    this.facultad = facultad;
    this.roles = roles;
}
            
}
