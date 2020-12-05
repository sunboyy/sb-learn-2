import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoundedSelectComponent } from './rounded-select.component';

describe('RoundedSelectComponent', () => {
  let component: RoundedSelectComponent;
  let fixture: ComponentFixture<RoundedSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundedSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundedSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
