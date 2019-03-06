import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacetileComponent } from './placetile.component';

describe('PlacetileComponent', () => {
  let component: PlacetileComponent;
  let fixture: ComponentFixture<PlacetileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacetileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacetileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
