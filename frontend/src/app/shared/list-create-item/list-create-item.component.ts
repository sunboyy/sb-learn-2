import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-create-item',
  templateUrl: './list-create-item.component.html',
  styleUrls: ['./list-create-item.component.scss']
})
export class ListCreateItemComponent {
  value = '';

  @Input()
  isLoading = false;

  @Output()
  create = new EventEmitter();

  onCreate(): void {
    if (this.value) {
      this.create.emit(this.value);
      this.value = '';
    }
  }
}
