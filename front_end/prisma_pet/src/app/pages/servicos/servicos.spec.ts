import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Servicos } from './servicos';

describe('Servicos', () => {
  let component: Servicos;
  let fixture: ComponentFixture<Servicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Servicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
