import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIdiomasComponent } from './agregar-idiomas.component';

describe('AgregarIdiomasComponent', () => {
  let component: AgregarIdiomasComponent;
  let fixture: ComponentFixture<AgregarIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
