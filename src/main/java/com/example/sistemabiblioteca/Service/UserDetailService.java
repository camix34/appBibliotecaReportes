package com.example.sistemabiblioteca.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.sistemabiblioteca.Repository.UsuarioEntityRepository;

import com.example.sistemabiblioteca.persistence.entity.UserEntity;

@Service
public class UserDetailService implements UserDetailsService {

    private final UsuarioEntityRepository usuarioEntityRepository;
    
    public UserDetailService(UsuarioEntityRepository usuarioEntityRepository) {
        this.usuarioEntityRepository = usuarioEntityRepository;
        
    }
    
    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
  
       

        UserEntity userEntity = usuarioEntityRepository.findUserEntityByUsername(name)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + name + " no existe."));
               
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        //en este punto ya no imprime el userEntity.getUsername() arriba si lo imprime

        userEntity.getRoles().forEach(role ->
                authorityList.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleEnum().name()))
        );
       
        userEntity.getRoles().stream()
                .flatMap(role -> role.getPermissionsList().stream())
                .forEach(permission ->
                        authorityList.add(new SimpleGrantedAuthority(permission.getName()))
        );
        
        
       
  
        return new User(
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.isEnabled(),
                userEntity.isAccountNoExpired(),
                userEntity.isAccountNolocked(),
                userEntity.isCredentialNoExpired(),
                authorityList             
        );

      
    }

    
}

