import { Component, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import { SalesData } from '../../app/model/data.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  chartData: SalesData[] = [
    { category: 'Laptops', value: 120 },
    { category: 'Phones', value: 90 },
    { category: 'Tablets', value: 60 },
    { category: 'Monitors', value: 50 },
    { category: 'Accessories', value: 30 }
  ];

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('barChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const option: echarts.EChartsOption = {
        title: {
          text: 'Top 5 Product Sales',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(item => item.category)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: this.chartData.map(item => item.value),
            itemStyle: {
              color: '#5470C6'
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
}
