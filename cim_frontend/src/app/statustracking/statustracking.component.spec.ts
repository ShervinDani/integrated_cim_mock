// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { StatustrackingComponent } from './statustracking.component';

// describe('StatustrackingComponent', () => {
//   let component: StatustrackingComponent;
//   let fixture: ComponentFixture<StatustrackingComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [StatustrackingComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(StatustrackingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatustrackingComponent } from './statustracking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

describe('StatustrackingComponent', () => {
  let component: StatustrackingComponent;
  let fixture: ComponentFixture<StatustrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StatustrackingComponent,
        HttpClientTestingModule,
        FormsModule,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatustrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if phone number is empty', () => {
    component.phoneNumber = '';
    component.checkStatus();
    expect(component.statusMessage).toBe('');
    expect(component.errorMessage).toBe('Please enter a valid phone number.');
  });
});

