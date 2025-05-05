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
  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    const dom = document.getElementById('pieChart');
    if (dom) {
      this.chartInstance = echarts.init(dom);

      this.yearService.selectedYear$.subscribe(year => {
        this.fetchAndRender(year);
      });
    }
  }

  private fetchAndRender(year: number): void {
    this.dataService.getBookingsByChannel(year).subscribe({
      next: data => {
        const option: echarts.EChartsOption = {
          title: {
            text: `Booking Channel Share - ${year}`,
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
              data: data.map(d => ({
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

        this.chartInstance.setOption(option);
      },
      error: err => console.error('Failed to fetch booking channels:', err)
    });
  }
}
