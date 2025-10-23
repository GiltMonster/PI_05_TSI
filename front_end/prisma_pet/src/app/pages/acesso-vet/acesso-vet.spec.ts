import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoVet } from './acesso-vet';

describe('AcessoVet', () => {
  let component: AcessoVet;
  let fixture: ComponentFixture<AcessoVet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoVet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoVet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
