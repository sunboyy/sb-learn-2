import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecallcardLearnComponent } from './recallcard-learn/recallcard-learn.component';
import { RecallcardManageComponent } from './recallcard-manage/recallcard-manage.component';
import { RecallcardComponent } from './recallcard.component';

@NgModule({
  declarations: [RecallcardComponent, RecallcardLearnComponent, RecallcardManageComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule]
})
export class RecallcardModule {}
