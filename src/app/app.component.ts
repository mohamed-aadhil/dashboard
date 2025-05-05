import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../Components/header/header.component';
import { YearSelectorComponent } from '../Components/year-selector/year-selector.component';
import { BookingTrendComponent } from '../Components/booking-trend-chart/booking-trend.component';
import { BookingChannelComponent } from '../Components/booking-channel-chart/booking-channel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    YearSelectorComponent,
    BookingTrendComponent,
    BookingChannelComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

