import { Component, AfterViewInit, inject } from '@angular/core';
import * as echarts from 'echarts';
import { BookingDataService } from '../../app/services/booking-data.service';
import { YearSelectionService } from '../../app/services/year-selection.service';
import { BookingChannel } from '../../app/model/booking-channel.model';

@Component({
  selector: 'app-booking-channel',
  standalone: true,
  templateUrl: './booking-channel.component.html',
  styleUrls: ['./booking-channel.component.css']
})
export class BookingChannelComponent implements AfterViewInit {
  private dataService = inject(BookingDataService);
  private yearService = inject(YearSelectionService);
  
  chartData: BookingChannel[] = [];
  selectedYear: number = 2024;

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
    this.dataService.getBookingsByChannel(year).subscribe({
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
      const chartDom = document.getElementById('pieChart');
      if (!chartDom) return;
  
      const chart = echarts.init(chartDom);
        const option: echarts.EChartsOption = {
          title: {
            text: `Booking Channel Share - ${this.selectedYear}`,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 10,
            left: 'center'
          },
          series: [
            {
              type: 'pie',
              radius: '60%',
              data: this.chartData.map(d => ({
                name: d.channel,
                value: d.bookings
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(option);
      }
    }
        
