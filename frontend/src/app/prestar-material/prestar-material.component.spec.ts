import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestarMaterialComponent } from './prestar-material.component';

describe('PrestarMaterialComponent', () => {
  let component: PrestarMaterialComponent;
  let fixture: ComponentFixture<PrestarMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestarMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
