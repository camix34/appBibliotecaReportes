import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { PerfilDTO } from '../dto/perfil-dto';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  //obtener el perfil completo con solo el id
  constructor(private usuarioService:PerfilService){}
  perfilCompleto!: PerfilDTO;
  ngOnInit(): void {
       const id = localStorage.getItem('idusuario');

  if (id) {
    this.usuarioService.getPerfil(Number(id)).subscribe({
      next: (data) => {
        console.log('Expediente completo:', data);
        this.perfilCompleto = data;
      },
      error: (err) => {
        console.error('Error al cargar el perfil completo:', err);
      }
    });
  } else {
    console.warn('No se encontró el idusuario en el localStorage');
  }
  }
}
