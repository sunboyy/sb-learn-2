import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallcardManageComponent } from './recallcard-manage.component';

describe('RecallcardManageComponent', () => {
  let component: RecallcardManageComponent;
  let fixture: ComponentFixture<RecallcardManageComponent>;

  beforeEach(async(() => {
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
