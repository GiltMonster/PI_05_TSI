import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPet } from './modal-edit-pet';

describe('ModalEditPet', () => {
  let component: ModalEditPet;
  let fixture: ComponentFixture<ModalEditPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
