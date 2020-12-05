import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderTextComponent } from './header-text.component';

describe('HeaderTextComponent', () => {
  let component: HeaderTextComponent;
  let fixture: ComponentFixture<HeaderTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
