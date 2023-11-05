import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionTableComponent } from './user-collection-table.component';

describe('UserCollectionTableComponent', () => {
  let component: UserCollectionTableComponent;
  let fixture: ComponentFixture<UserCollectionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCollectionTableComponent]
    });
    fixture = TestBed.createComponent(UserCollectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
