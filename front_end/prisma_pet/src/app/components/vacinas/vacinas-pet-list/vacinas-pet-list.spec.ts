import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasPetList } from './vacinas-pet-list';

describe('VacinasPetList', () => {
  let component: VacinasPetList;
  let fixture: ComponentFixture<VacinasPetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacinasPetList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacinasPetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
