import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIdiomasComponent } from './actualizar-idiomas.component';

describe('ActualizarIdiomasComponent', () => {
  let component: ActualizarIdiomasComponent;
  let fixture: ComponentFixture<ActualizarIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
