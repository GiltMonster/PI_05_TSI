import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorList } from './tutor-list';

describe('TutorList', () => {
  let component: TutorList;
  let fixture: ComponentFixture<TutorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
