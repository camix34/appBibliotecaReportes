import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaDetalleComponent } from './idioma-detalle.component';

describe('IdiomaDetalleComponent', () => {
  let component: IdiomaDetalleComponent;
  let fixture: ComponentFixture<IdiomaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdiomaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdiomaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
