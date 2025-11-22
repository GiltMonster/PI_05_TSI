import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrivacidade } from './dialog-privacidade';

describe('DialogPrivacidade', () => {
  let component: DialogPrivacidade;
  let fixture: ComponentFixture<DialogPrivacidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrivacidade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrivacidade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
