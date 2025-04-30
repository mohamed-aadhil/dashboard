import { AfterViewInit, Component } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {

  pieData = [
    { value: 1048, name: 'Electronics' },
    { value: 735, name: 'Clothing' },
    { value: 580, name: 'Furniture' },
    { value: 484, name: 'Books' },
    { value: 300, name: 'Others' }
  ];

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('pieChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const option: echarts.EChartsOption = {
        title: {
          text: 'Sales by Category',
          left: 'center'
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
            name: 'Sales',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
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

      myChart.setOption(option);
    }
  }
}
