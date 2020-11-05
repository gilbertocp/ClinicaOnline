import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaProfesionalModalComponent } from './resenia-profesional-modal.component';

describe('ReseniaProfesionalModalComponent', () => {
  let component: ReseniaProfesionalModalComponent;
  let fixture: ComponentFixture<ReseniaProfesionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaProfesionalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaProfesionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
