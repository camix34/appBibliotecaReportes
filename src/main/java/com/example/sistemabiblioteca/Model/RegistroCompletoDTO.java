package com.example.sistemabiblioteca.Model;

public class RegistroCompletoDTO {
  
    // Datos para UsuarioModel (usuario)
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String email;
    private String telefono;
    private String tipo; // "ESTUDIANTE", "DOCENTE", etc.
    private String direccion;

    // Datos específicos para Estudiante
    private Long carreraId; 
    private Long facultadId;

    // Datos específicos para Bibliotecario
    private String area;
    private Long contrato_id;
    private String dui;
     
    //datos especificos para Docente

    private Long especialidad;

    //setters y getters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

      public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }


    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

   public Long getFacultadId() {
    return facultadId;
}

    public void setFacultadId(Long facultadId) {
        this.facultadId = facultadId;
    }

    public Long getCarreraId() {
        return carreraId;
    }

    public void setCarreraId(Long carreraId) {
        this.carreraId = carreraId;
    }

       public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

       public Long getContrato_id() {
        return contrato_id;
    }

    public void setContrato_id(Long contrato_id) {
        this.contrato_id = contrato_id;
    }

    public String getDui() {
        return dui;
    }

    public void setDui(String dui) {
        this.dui = dui;
    }

    public Long getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Long especialidad) {
        this.especialidad = especialidad;
    }

}
