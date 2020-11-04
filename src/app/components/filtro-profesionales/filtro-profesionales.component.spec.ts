import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProfesionalesComponent } from './filtro-profesionales.component';

describe('FiltroProfesionalesComponent', () => {
  let component: FiltroProfesionalesComponent;
  let fixture: ComponentFixture<FiltroProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroProfesionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
