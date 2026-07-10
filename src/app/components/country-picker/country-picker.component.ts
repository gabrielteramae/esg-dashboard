import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { COUNTRY_OPTIONS, CountryOption } from '../../models/country.model';

@Component({
  selector: 'app-country-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-picker.component.html',
  styleUrl: './country-picker.component.css',
})
export class CountryPickerComponent {
  @Input() selected = 'BRA';
  @Output() selectedChange = new EventEmitter<string>();

  countries: CountryOption[] = COUNTRY_OPTIONS;

  onChange(code: string): void {
    this.selected = code;
    this.selectedChange.emit(code);
  }
}
