import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMaterialesComponent } from './actualizar-materiales.component';

describe('ActualizarMaterialesComponent', () => {
  let component: ActualizarMaterialesComponent;
  let fixture: ComponentFixture<ActualizarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
