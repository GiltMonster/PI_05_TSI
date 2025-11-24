import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoPetModal } from './prescricao-pet-modal';

describe('PrescricaoPetModal', () => {
  let component: PrescricaoPetModal;
  let fixture: ComponentFixture<PrescricaoPetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescricaoPetModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescricaoPetModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
