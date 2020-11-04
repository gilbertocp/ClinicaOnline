import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirTurnoModalComponent } from './pedir-turno-modal.component';

describe('PedirTurnoModalComponent', () => {
  let component: PedirTurnoModalComponent;
  let fixture: ComponentFixture<PedirTurnoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedirTurnoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirTurnoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
