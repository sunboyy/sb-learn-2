import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecallcardComponent } from './recallcard.component';

describe('RecallcardComponent', () => {
  let component: RecallcardComponent;
  let fixture: ComponentFixture<RecallcardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
