import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent {
  @Input()
  text: string;

  @Output()
  edit = new EventEmitter();

  isEditing = false;
  editValue: string;

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
