import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosAnexosPet } from './outros-anexos-pet';

describe('OutrosAnexosPet', () => {
  let component: OutrosAnexosPet;
  let fixture: ComponentFixture<OutrosAnexosPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrosAnexosPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutrosAnexosPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
