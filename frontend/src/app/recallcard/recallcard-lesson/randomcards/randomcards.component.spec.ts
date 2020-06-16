import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomcardsComponent } from './randomcards.component';

describe('RandomcardsComponent', () => {
  let component: RandomcardsComponent;
  let fixture: ComponentFixture<RandomcardsComponent>;

  beforeEach(async(() => {
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
