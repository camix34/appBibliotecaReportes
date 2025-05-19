import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIdiomasComponent } from './lista-idiomas.component';

describe('ListaIdiomasComponent', () => {
  let component: ListaIdiomasComponent;
  let fixture: ComponentFixture<ListaIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
