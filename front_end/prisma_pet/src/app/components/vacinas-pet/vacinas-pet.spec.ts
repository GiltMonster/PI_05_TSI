import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasPet } from './vacinas-pet';

describe('VacinasPet', () => {
  let component: VacinasPet;
  let fixture: ComponentFixture<VacinasPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacinasPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacinasPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
