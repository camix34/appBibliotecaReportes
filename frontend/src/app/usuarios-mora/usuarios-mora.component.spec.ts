import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMoraComponent } from './usuarios-mora.component';

describe('UsuariosMoraComponent', () => {
  let component: UsuariosMoraComponent;
  let fixture: ComponentFixture<UsuariosMoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosMoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosMoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
