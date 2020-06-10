import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecallcardLearnComponent } from './recallcard-learn/recallcard-learn.component';
import { RecallcardComponent } from './recallcard.component';

@NgModule({
  declarations: [RecallcardComponent, RecallcardLearnComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class RecallcardModule {}
