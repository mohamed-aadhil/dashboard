import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingTrend } from '../model/booking-trend.model';
import { BookingChannel } from '../model/booking-channel.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingDataService {
  constructor(private http: HttpClient) {}

  getMonthlyBookings(year: number): Observable<BookingTrend[]> {
    return this.http.get<BookingTrend[]>(`http://localhost:5008/api/booking/counts?year=${year}`);
  }

  getBookingsByChannel(year: number): Observable<BookingChannel[]> {
    return this.http.get<BookingChannel[]>(`http://localhost:5008/api/booking/channel?year=${year}`);
  }
  
}
