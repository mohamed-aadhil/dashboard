import { Component, AfterViewInit, inject } from '@angular/core';
import * as echarts from 'echarts';
import { BookingDataService } from '../../app/services/booking-data.service';
import { YearSelectionService } from '../../app/services/year-selection.service';
import { BookingHaul } from '../../app/model/booking-haul.model';

@Component({
  selector: 'app-booking-haul',
  standalone: true,
  templateUrl: './booking-haul.component.html',
  styleUrls: ['./booking-haul.component.css']
})
export class BookingHaulComponent implements AfterViewInit {
  private bookingService = inject(BookingDataService);
  private yearService = inject(YearSelectionService);
  selectedYear: number = 2024;
  chartData: BookingHaul[] = [];
  


  ngAfterViewInit(): void {
    
    // Listen for year changes from shared service
    this.yearService.selectedYear$.subscribe({
      next: year => {
        this.selectedYear = year;
        this.fetchAndRenderChart(year);
      }
    });
  }

  private fetchAndRenderChart(year: number): void {
    this.bookingService.getHaulBookings(year).subscribe({
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
    const chartDom = document.getElementById('donutChart');
    if (!chartDom) return;

    const chart = echarts.init(chartDom);
    const option: echarts.EChartsOption = {
      title: {
        text: `Booking Distribution by Haul Type - ${this.selectedYear}` ,
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Bookings',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)'
          },
          data: this.chartData.map(item => ({
            name: item.haulType,
            value: item.bookings
          }))
        }
      ]
    };

    chart.setOption(option);
  }
}
