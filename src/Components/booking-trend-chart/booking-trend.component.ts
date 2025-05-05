import { Component, AfterViewInit, inject } from '@angular/core';
import * as echarts from 'echarts';
import { BookingTrend } from '../../app/model/booking-trend.model';
import { BookingDataService } from '../../app/services/booking-data.service';
import { YearSelectionService } from '../../app/services/year-selection.service';

@Component({
  selector: 'app-booking-trend',
  standalone: true,
  templateUrl: './booking-trend.component.html',
  styleUrls: ['./booking-trend.component.css']
})
export class BookingTrendComponent implements AfterViewInit {
  private bookingService = inject(BookingDataService);
  private yearService = inject(YearSelectionService);
  chartData: BookingTrend[] = [];
  selectedYear: number = 2024;

  chartType: 'line' | 'bar' = 'line';

  ngAfterViewInit(): void {
    // Listen for year changes from shared service
    this.yearService.selectedYear$.subscribe({
      next: year => {
        this.selectedYear = year;
        this.fetchAndRenderChart(year);
      }
    });
  }

  onChartTypeChange(type: 'line' | 'bar') {
    this.chartType = type;
    this.renderChart();
  }

  private fetchAndRenderChart(year: number): void {
    this.bookingService.getMonthlyBookings(year).subscribe({
      next: data => {
        this.chartData = data ?? [];
        this.renderChart();
      },
      error: err => {
        console.error('Error fetching booking data:', err);
        this.chartData = [];
      }
    });
  }

  private renderChart(): void {
    const chartDom = document.getElementById('barChart');
    if (!chartDom) return;

    echarts.dispose(chartDom); 

    const chart = echarts.init(chartDom);
    const option: echarts.EChartsOption = {
      title: {
        text: `Monthly Booking Trend – ${this.selectedYear}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.chartData.map(item => item.month)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Bookings',
          type: this.chartType,
          smooth: this.chartType === 'line',
          data: this.chartData.map(item => item.bookings),
          itemStyle: {
            color: '#73C0DE'
          }
        }
      ]
    };

    chart.setOption(option);
  }
}
