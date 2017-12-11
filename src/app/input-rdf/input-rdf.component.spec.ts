import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRdfComponent } from './input-rdf.component';

describe('InputRdfComponent', () => {
  let component: InputRdfComponent;
  let fixture: ComponentFixture<InputRdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
