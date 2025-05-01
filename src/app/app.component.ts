import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { HeaderComponent } from '../Components/header/header.component';
import { LoadingSpinnerComponent } from '../Components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    LoadingSpinnerComponent, // 👈 required for <app-loading-spinner>
  ],
  templateUrl: './app.component.html', // 👈 using external template now
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private viewContainerRef = inject(ViewContainerRef);

  loading = true;

  async ngAfterViewInit() {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { ChartComponent } = await import('../Components/booking-trend-chart/booking-trend.component');
    this.viewContainerRef.createComponent(ChartComponent);

    const { PieChartComponent } = await import('../Components/booking-channel-chart/booking-channel.component');
    this.viewContainerRef.createComponent(PieChartComponent);

    this.loading = false;
  }
}
