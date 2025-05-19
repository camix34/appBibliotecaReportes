import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePrestamosActivosComponent } from './reporte-prestamos-activos.component';

describe('ReportePrestamosActivosComponent', () => {
  let component: ReportePrestamosActivosComponent;
  let fixture: ComponentFixture<ReportePrestamosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportePrestamosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportePrestamosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
