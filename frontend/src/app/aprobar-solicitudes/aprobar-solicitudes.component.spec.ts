import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarSolicitudesComponent } from './aprobar-solicitudes.component';

describe('AprobarSolicitudesComponent', () => {
  let component: AprobarSolicitudesComponent;
  let fixture: ComponentFixture<AprobarSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AprobarSolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
