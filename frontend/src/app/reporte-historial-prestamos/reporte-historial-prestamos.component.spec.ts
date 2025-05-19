import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHistorialPrestamosComponent } from './reporte-historial-prestamos.component';

describe('ReporteHistorialPrestamosComponent', () => {
  let component: ReporteHistorialPrestamosComponent;
  let fixture: ComponentFixture<ReporteHistorialPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteHistorialPrestamosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteHistorialPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
