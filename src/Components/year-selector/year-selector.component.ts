import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YearSelectionService } from '../../app/services/year-selection.service';

@Component({
  selector: 'app-year-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './year-selector.component.html'
})
export class YearSelectorComponent {
  private yearService = inject(YearSelectionService);
  years = [2023, 2024];
  selectedYear = 2024;

  onYearChange(event: Event): void {
    const selected = +(event.target as HTMLSelectElement).value;
    this.yearService.setYear(selected);
  }
}
