import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdit } from './modal-edit';

describe('ModalEdit', () => {
  let component: ModalEdit;
  let fixture: ComponentFixture<ModalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
