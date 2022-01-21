import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalWindowComponent } from './post-modal-window.component';

describe('ModalWindowComponent', () => {
  let component: PostModalWindowComponent;
  let fixture: ComponentFixture<PostModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
