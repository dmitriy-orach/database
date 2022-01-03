import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalWindowComponent } from './user-modal-window.component';

describe('UserModalWindowComponent', () => {
  let component: UserModalWindowComponent;
  let fixture: ComponentFixture<UserModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
