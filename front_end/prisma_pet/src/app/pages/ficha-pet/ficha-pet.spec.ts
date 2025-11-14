import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPet } from './ficha-pet';

describe('FichaPet', () => {
  let component: FichaPet;
  let fixture: ComponentFixture<FichaPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
