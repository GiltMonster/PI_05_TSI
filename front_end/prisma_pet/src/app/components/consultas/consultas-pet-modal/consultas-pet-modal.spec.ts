import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasPetModal } from './consultas-pet-modal';

describe('ConsultasPetModal', () => {
  let component: ConsultasPetModal;
  let fixture: ComponentFixture<ConsultasPetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasPetModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasPetModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
