import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHaulComponent } from './booking-haul.component';

describe('BookingHaulComponent', () => {
  let component: BookingHaulComponent;
  let fixture: ComponentFixture<BookingHaulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingHaulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHaulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
