import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateServico } from './modal-create-servico';

describe('ModalCreateServico', () => {
  let component: ModalCreateServico;
  let fixture: ComponentFixture<ModalCreateServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
