import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolverPrestamoComponent } from './devolver-prestamo.component';

describe('DevolverPrestamoComponent', () => {
  let component: DevolverPrestamoComponent;
  let fixture: ComponentFixture<DevolverPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevolverPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolverPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
