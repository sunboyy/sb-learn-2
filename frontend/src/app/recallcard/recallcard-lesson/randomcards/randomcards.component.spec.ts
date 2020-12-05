import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RandomcardsComponent } from './randomcards.component';

describe('RandomcardsComponent', () => {
  let component: RandomcardsComponent;
  let fixture: ComponentFixture<RandomcardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
