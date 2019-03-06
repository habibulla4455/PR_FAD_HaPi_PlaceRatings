import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceHeaderComponent } from './place-header.component';

describe('PlaceHeaderComponent', () => {
  let component: PlaceHeaderComponent;
  let fixture: ComponentFixture<PlaceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
