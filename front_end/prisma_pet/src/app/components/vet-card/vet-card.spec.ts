import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetCard } from './vet-card';

describe('VetCard', () => {
  let component: VetCard;
  let fixture: ComponentFixture<VetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
