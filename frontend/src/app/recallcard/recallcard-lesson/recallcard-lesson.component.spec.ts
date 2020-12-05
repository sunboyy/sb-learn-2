import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecallcardLessonComponent } from './recallcard-lesson.component';

describe('RecallcardLessonComponent', () => {
  let component: RecallcardLessonComponent;
  let fixture: ComponentFixture<RecallcardLessonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallcardLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallcardLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
