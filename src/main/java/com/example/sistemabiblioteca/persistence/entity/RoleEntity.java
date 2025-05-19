package com.example.sistemabiblioteca.persistence.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ROLES_REGISTRADOS")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="ID_ROL")
    private Long id;

    @Column(name="NOMBRE_ROL")
    @Enumerated(EnumType.STRING)
    private RoleEnum roleEnum;

    
   
    @JsonManagedReference 
    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(
        name = "ROLES_PERMISOS",
        joinColumns = @JoinColumn(name = "ID_ROL"),
        inverseJoinColumns = @JoinColumn(name = "ID_PERMISO")
    )
    private Set<PermissionsEntity> permissionsList = new HashSet<>();

    public RoleEnum getRoleEnum() {
        return roleEnum;
    }

    public void setRoleEnum(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

}
