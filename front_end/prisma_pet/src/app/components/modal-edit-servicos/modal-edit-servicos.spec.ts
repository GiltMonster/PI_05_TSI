import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditServicos } from './modal-edit-servicos';

describe('ModalEditServicos', () => {
  let component: ModalEditServicos;
  let fixture: ComponentFixture<ModalEditServicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditServicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditServicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
