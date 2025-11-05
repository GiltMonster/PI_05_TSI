import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCard } from './tutor-card';

describe('TutorCard', () => {
  let component: TutorCard;
  let fixture: ComponentFixture<TutorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
