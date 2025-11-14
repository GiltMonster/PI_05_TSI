import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPet } from './header-pet';

describe('HeaderPet', () => {
  let component: HeaderPet;
  let fixture: ComponentFixture<HeaderPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
