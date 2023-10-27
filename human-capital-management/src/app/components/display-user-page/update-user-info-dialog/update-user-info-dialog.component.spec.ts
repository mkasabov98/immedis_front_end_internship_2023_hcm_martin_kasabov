import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoDialogComponent } from './update-user-info-dialog.component';

describe('UpdateUserInfoDialogComponent', () => {
  let component: UpdateUserInfoDialogComponent;
  let fixture: ComponentFixture<UpdateUserInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserInfoDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateUserInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
