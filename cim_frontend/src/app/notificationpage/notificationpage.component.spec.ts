import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPageComponent } from './notificationpage.component';


describe('NotificationpageComponent', () => {
  let component: NotificationPageComponent;
  let fixture: ComponentFixture<NotificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
