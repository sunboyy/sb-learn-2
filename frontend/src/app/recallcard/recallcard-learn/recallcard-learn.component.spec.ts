import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallcardLearnComponent } from './recallcard-learn.component';

describe('RecallcardLearnComponent', () => {
  let component: RecallcardLearnComponent;
  let fixture: ComponentFixture<RecallcardLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallcardLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallcardLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
