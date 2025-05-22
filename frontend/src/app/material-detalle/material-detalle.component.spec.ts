import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetalleComponent } from './material-detalle.component';

describe('MaterialDetalleComponent', () => {
  let component: MaterialDetalleComponent;
  let fixture: ComponentFixture<MaterialDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
