import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIngresosMoraComponent } from './reporte-ingresos-mora.component';

describe('ReporteIngresosMoraComponent', () => {
  let component: ReporteIngresosMoraComponent;
  let fixture: ComponentFixture<ReporteIngresosMoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteIngresosMoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteIngresosMoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
