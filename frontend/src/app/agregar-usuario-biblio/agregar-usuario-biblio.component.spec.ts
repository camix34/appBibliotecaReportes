import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuarioBiblioComponent } from './agregar-usuario-biblio.component';

describe('AgregarUsuarioBiblioComponent', () => {
  let component: AgregarUsuarioBiblioComponent;
  let fixture: ComponentFixture<AgregarUsuarioBiblioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioBiblioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarUsuarioBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
