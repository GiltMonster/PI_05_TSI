import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasPetModal } from './vacinas-pet-modal';

describe('VacinasPetModal', () => {
  let component: VacinasPetModal;
  let fixture: ComponentFixture<VacinasPetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacinasPetModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacinasPetModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
