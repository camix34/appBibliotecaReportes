import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsuarioBiblioComponent } from './actualizar-usuario-biblio.component';

describe('ActualizarUsuarioBiblioComponent', () => {
  let component: ActualizarUsuarioBiblioComponent;
  let fixture: ComponentFixture<ActualizarUsuarioBiblioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarUsuarioBiblioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUsuarioBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
