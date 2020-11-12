import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLoginComponent } from './grafico-login.component';

describe('GraficoLoginComponent', () => {
  let component: GraficoLoginComponent;
  let fixture: ComponentFixture<GraficoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
