import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermos } from './dialog-termos';

describe('DialogTermos', () => {
  let component: DialogTermos;
  let fixture: ComponentFixture<DialogTermos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTermos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTermos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
