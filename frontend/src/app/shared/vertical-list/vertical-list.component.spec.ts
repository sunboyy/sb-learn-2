import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerticalListComponent } from './vertical-list.component';

describe('VerticalListComponent', () => {
  let component: VerticalListComponent;
  let fixture: ComponentFixture<VerticalListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
