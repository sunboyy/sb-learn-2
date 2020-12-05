import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegularTextFieldComponent } from './regular-text-field.component';

describe('RegularTextFieldComponent', () => {
  let component: RegularTextFieldComponent;
  let fixture: ComponentFixture<RegularTextFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
