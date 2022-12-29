import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent {

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn btn-primary';
  @Output() outValueEvent = new EventEmitter<number>();

  changeProgressValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.outValueEvent.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.outValueEvent.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.outValueEvent.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    }
    this.outValueEvent.emit(value);
  }

}
