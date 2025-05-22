import { TestBed } from '@angular/core/testing';

import { UsuarioBiblioService } from './usuario-biblio.service';

describe('UsuarioBiblioService', () => {
  let service: UsuarioBiblioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioBiblioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
