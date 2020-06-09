import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallcardComponent } from './recallcard.component';

describe('RecallcardComponent', () => {
  let component: RecallcardComponent;
  let fixture: ComponentFixture<RecallcardComponent>;

  beforeEach(async(() => {
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
