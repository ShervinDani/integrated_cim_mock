import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailerDashboardComponent } from './retailerdashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('RetailerDashboardComponent', () => {
  let component: RetailerDashboardComponent;
  let fixture: ComponentFixture<RetailerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailerDashboardComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RetailerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});


