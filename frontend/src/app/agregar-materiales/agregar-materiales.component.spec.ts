import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMaterialesComponent } from './agregar-materiales.component';

describe('AgregarMaterialesComponent', () => {
  let component: AgregarMaterialesComponent;
  let fixture: ComponentFixture<AgregarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
