import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTurnoComponent } from './busqueda-turno.component';

describe('BusquedaTurnoComponent', () => {
  let component: BusquedaTurnoComponent;
  let fixture: ComponentFixture<BusquedaTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
