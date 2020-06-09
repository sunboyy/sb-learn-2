import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripedHeaderComponent } from './striped-header.component';

describe('StripedHeaderComponent', () => {
  let component: StripedHeaderComponent;
  let fixture: ComponentFixture<StripedHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripedHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
