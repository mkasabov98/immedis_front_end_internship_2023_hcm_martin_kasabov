import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserPageComponent } from './display-user-page.component';

describe('DisplayUserPageComponent', () => {
  let component: DisplayUserPageComponent;
  let fixture: ComponentFixture<DisplayUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayUserPageComponent]
    });
    fixture = TestBed.createComponent(DisplayUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
