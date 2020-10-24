import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAutorizadoModalComponent } from './no-autorizado-modal.component';

describe('NoAutorizadoModalComponent', () => {
  let component: NoAutorizadoModalComponent;
  let fixture: ComponentFixture<NoAutorizadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAutorizadoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAutorizadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
