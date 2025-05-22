import { TestBed } from '@angular/core/testing';

import { RenovacionPrestamoService } from './renovacion-prestamo.service';

describe('RenovacionPrestamoService', () => {
  let service: RenovacionPrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenovacionPrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
