import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrismapetComponent } from './prismapet.component';

describe('PrismapetComponent', () => {
  let component: PrismapetComponent;
  let fixture: ComponentFixture<PrismapetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismapetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrismapetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
