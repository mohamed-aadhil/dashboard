import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Sales Dashboard';
  description = 'A simple Angular app using ECharts to visualize static product sales data.';
}
