import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoInicio } from './texto-inicio';

describe('TextoInicio', () => {
  let component: TextoInicio;
  let fixture: ComponentFixture<TextoInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextoInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoInicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
