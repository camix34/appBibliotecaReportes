import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarCarnetComponent } from './renovar-carnet.component';

describe('RenovarCarnetComponent', () => {
  let component: RenovarCarnetComponent;
  let fixture: ComponentFixture<RenovarCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenovarCarnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
