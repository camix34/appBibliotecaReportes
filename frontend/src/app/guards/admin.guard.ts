import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const username = (localStorage.getItem('username') || '[]');
  const tipo = (localStorage.getItem('tipo')|| '[]')

  if (username.includes('administrador') || tipo.includes('BIBLIOTECARIO')) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
}