import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewPostComponent } from './modal-new-post.component';

describe('ModalNewPostComponent', () => {
  let component: ModalNewPostComponent;
  let fixture: ComponentFixture<ModalNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
