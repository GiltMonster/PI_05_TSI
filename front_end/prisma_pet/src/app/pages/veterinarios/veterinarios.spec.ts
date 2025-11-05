import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veterinarios } from './veterinarios';

describe('Veterinarios', () => {
  let component: Veterinarios;
  let fixture: ComponentFixture<Veterinarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veterinarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Veterinarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
