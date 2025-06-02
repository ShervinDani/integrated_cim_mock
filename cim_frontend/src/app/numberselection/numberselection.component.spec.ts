import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberselectionComponent } from './numberselection.component';

describe('NumberselectionComponent', () => {
  let component: NumberselectionComponent;
  let fixture: ComponentFixture<NumberselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberselectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

