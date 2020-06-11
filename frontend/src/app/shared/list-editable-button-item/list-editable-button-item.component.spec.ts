import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditableButtonItemComponent } from './list-editable-button-item.component';

describe('ListEditableButtonItemComponent', () => {
  let component: ListEditableButtonItemComponent;
  let fixture: ComponentFixture<ListEditableButtonItemComponent>;

  beforeEach(async(() => {
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
