import { TestBed } from '@angular/core/testing';

import { IngresosMoraService } from './ingresos-mora.service';

describe('IngresosMoraService', () => {
  let service: IngresosMoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresosMoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
