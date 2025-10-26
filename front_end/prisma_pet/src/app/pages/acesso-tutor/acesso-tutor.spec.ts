import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoTutor } from './acesso-tutor';

describe('AcessoTutor', () => {
  let component: AcessoTutor;
  let fixture: ComponentFixture<AcessoTutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoTutor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoTutor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
