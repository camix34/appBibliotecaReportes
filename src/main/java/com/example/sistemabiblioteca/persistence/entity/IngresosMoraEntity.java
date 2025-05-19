package com.example.sistemabiblioteca.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "HISTORIAL_INGRESOS_MORA")
public class IngresosMoraEntity {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID_INGRESO;

    @Column(name = "IDUSUARIO" )
    private Long IDUSUARIO;

    @Column(name = "NOMBREUSUARIO")
    private String NOMBREUSUARIO; 
    

      @Column(name = "CARNET")
    private String CARNET; 
    
      @Column(name = "MONTO")
    private String MONTO; 

      @Column(name = "FECHA_PAGO")
    private String FECHA_PAGO; 
    
    
    
    
    

}
