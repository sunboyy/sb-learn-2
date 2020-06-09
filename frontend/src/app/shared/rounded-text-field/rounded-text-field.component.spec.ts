import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedTextFieldComponent } from './rounded-text-field.component';

describe('RoundedTextFieldComponent', () => {
  let component: RoundedTextFieldComponent;
  let fixture: ComponentFixture<RoundedTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundedTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundedTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
