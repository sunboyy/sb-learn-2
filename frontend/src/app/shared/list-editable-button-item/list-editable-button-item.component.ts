import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-editable-button-item',
  templateUrl: './list-editable-button-item.component.html',
  styleUrls: ['./list-editable-button-item.component.scss']
})
export class ListEditableButtonItemComponent {
  @Input()
  text: string;

  @Input()
  selected: boolean;

  @Output()
  edit = new EventEmitter();

  isEditing = false;
  editValue: string;

  onStartEdit() {
    this.isEditing = true;
    this.editValue = this.text;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  onFinishEdit() {
    this.isEditing = false;
    this.edit.emit(this.editValue);
  }
}
