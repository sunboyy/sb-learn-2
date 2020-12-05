import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListEditableButtonItemComponent } from './list-editable-button-item.component';

describe('ListEditableButtonItemComponent', () => {
  let component: ListEditableButtonItemComponent;
  let fixture: ComponentFixture<ListEditableButtonItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEditableButtonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditableButtonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
