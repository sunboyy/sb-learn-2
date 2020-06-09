import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecallcardComponent } from './recallcard.component';

@NgModule({
  declarations: [RecallcardComponent],
  imports: [CommonModule, SharedModule]
})
export class RecallcardModule {}
