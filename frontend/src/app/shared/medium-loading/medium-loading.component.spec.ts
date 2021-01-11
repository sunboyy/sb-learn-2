import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumLoadingComponent } from './medium-loading.component';

describe('MediumLoadingComponent', () => {
  let component: MediumLoadingComponent;
  let fixture: ComponentFixture<MediumLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
