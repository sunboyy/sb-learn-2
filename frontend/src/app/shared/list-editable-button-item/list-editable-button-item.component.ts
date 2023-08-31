import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-editable-button-item',
  templateUrl: './list-editable-button-item.component.html',
  styleUrls: ['./list-editable-button-item.component.scss']
})
export class ListEditableButtonItemComponent {
  @Input()
  text = '';

  @Input()
  selected = false;

  @Input()
  isLoading = false;

  @Output()
  edit = new EventEmitter();

  isEditing = false;
  editValue = '';

  onStartEdit(): void {
    this.isEditing = true;
    this.editValue = this.text;
  }

  onCancelEdit(): void {
    this.isEditing = false;
  }

  onFinishEdit(): void {
    this.isEditing = false;
    this.edit.emit(this.editValue);
  }
}
