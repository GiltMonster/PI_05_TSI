import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasPet } from './consultas-pet';

describe('ConsultasPet', () => {
  let component: ConsultasPet;
  let fixture: ComponentFixture<ConsultasPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
