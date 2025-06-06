import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLogsComponent } from './session-logs.component';

describe('SessionLogsComponent', () => {
  let component: SessionLogsComponent;
  let fixture: ComponentFixture<SessionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
