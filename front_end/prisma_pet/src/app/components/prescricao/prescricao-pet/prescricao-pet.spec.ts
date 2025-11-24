import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoPet } from './prescricao-pet';

describe('PrescricaoPet', () => {
  let component: PrescricaoPet;
  let fixture: ComponentFixture<PrescricaoPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescricaoPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescricaoPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
