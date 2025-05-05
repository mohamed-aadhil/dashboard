import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YearSelectionService {
  private selectedYearSubject = new BehaviorSubject<number>(2024);
  selectedYear$ = this.selectedYearSubject.asObservable();

  setYear(year: number): void {
    this.selectedYearSubject.next(year);
  }
}
