import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreate } from './modal-create';

describe('ModalCreate', () => {
  let component: ModalCreate;
  let fixture: ComponentFixture<ModalCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
