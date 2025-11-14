import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPet } from './documentos-pet';

describe('DocumentosPet', () => {
  let component: DocumentosPet;
  let fixture: ComponentFixture<DocumentosPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
