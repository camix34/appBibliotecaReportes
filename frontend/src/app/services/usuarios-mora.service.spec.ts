import { TestBed } from '@angular/core/testing';

import { UsuariosMoraService } from './usuarios-mora.service';

describe('UsuariosMoraService', () => {
  let service: UsuariosMoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosMoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
