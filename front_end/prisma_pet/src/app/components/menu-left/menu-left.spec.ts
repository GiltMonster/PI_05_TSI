import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLeft } from './menu-left';

describe('MenuLeft', () => {
  let component: MenuLeft;
  let fixture: ComponentFixture<MenuLeft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLeft]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLeft);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
