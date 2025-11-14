import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasPetList } from './consultas-pet-list';

describe('ConsultasPetList', () => {
  let component: ConsultasPetList;
  let fixture: ComponentFixture<ConsultasPetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasPetList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasPetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
