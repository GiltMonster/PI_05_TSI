import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoPetList } from './prescricao-pet-list';

describe('PrescricaoPetList', () => {
  let component: PrescricaoPetList;
  let fixture: ComponentFixture<PrescricaoPetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescricaoPetList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescricaoPetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
