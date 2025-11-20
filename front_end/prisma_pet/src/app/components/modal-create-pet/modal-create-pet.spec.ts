import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePet } from './modal-create-pet';

describe('ModalCreatePet', () => {
  let component: ModalCreatePet;
  let fixture: ComponentFixture<ModalCreatePet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreatePet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatePet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
