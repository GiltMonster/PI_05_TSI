import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animais } from './animais';

describe('Animais', () => {
  let component: Animais;
  let fixture: ComponentFixture<Animais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
