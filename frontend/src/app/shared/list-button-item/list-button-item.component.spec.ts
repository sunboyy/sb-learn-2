import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListButtonItemComponent } from './list-button-item.component';

describe('ListButtonItemComponent', () => {
  let component: ListButtonItemComponent;
  let fixture: ComponentFixture<ListButtonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListButtonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListButtonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
