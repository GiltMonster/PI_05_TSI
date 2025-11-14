import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexosPet } from './anexos-pet';

describe('AnexosPet', () => {
  let component: AnexosPet;
  let fixture: ComponentFixture<AnexosPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexosPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexosPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
