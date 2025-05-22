import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriasComponent } from './agregar-categorias.component';

describe('AgregarCategoriasComponent', () => {
  let component: AgregarCategoriasComponent;
  let fixture: ComponentFixture<AgregarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
