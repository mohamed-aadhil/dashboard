import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { ChartComponent } from '../Components/chart/chart.component';
import { PieChartComponent } from '../Components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ChartComponent, PieChartComponent],
  template: `
    <app-header></app-header>
    <app-chart></app-chart>
    <app-pie-chart></app-pie-chart>
  `
})
export class AppComponent {}
