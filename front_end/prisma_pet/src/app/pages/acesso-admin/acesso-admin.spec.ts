import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoAdmin } from './acesso-admin';

describe('AcessoAdmin', () => {
  let component: AcessoAdmin;
  let fixture: ComponentFixture<AcessoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
