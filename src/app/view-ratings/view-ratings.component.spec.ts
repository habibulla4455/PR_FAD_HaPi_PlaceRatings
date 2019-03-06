import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRatingsComponent } from './view-ratings.component';

describe('ViewRatingsComponent', () => {
  let component: ViewRatingsComponent;
  let fixture: ComponentFixture<ViewRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
