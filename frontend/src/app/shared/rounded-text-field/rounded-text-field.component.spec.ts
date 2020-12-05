import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoundedTextFieldComponent } from './rounded-text-field.component';

describe('RoundedTextFieldComponent', () => {
  let component: RoundedTextFieldComponent;
  let fixture: ComponentFixture<RoundedTextFieldComponent>;

  beforeEach(waitForAsync(() => {
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
