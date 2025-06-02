import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationpageComponent } from './notificationpage.component';

describe('NotificationpageComponent', () => {
  let component: NotificationpageComponent;
  let fixture: ComponentFixture<NotificationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationpageComponent]
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
