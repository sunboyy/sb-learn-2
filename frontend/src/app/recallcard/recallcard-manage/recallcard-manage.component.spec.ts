import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecallcardManageComponent } from './recallcard-manage.component';

describe('RecallcardManageComponent', () => {
  let component: RecallcardManageComponent;
  let fixture: ComponentFixture<RecallcardManageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallcardManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallcardManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
