import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvedTextFieldComponent } from './curved-text-field.component';

describe('CurvedTextFieldComponent', () => {
  let component: CurvedTextFieldComponent;
  let fixture: ComponentFixture<CurvedTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurvedTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvedTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
