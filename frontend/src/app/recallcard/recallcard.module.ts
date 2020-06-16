import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecallcardLearnComponent } from './recallcard-learn/recallcard-learn.component';
import { MulticardsComponent } from './recallcard-lesson/multicards/multicards.component';
import { RecallcardLessonComponent } from './recallcard-lesson/recallcard-lesson.component';
import { RecallcardManageComponent } from './recallcard-manage/recallcard-manage.component';
import { RecallcardComponent } from './recallcard.component';
import { RandomcardsComponent } from './recallcard-lesson/randomcards/randomcards.component';

@NgModule({
  declarations: [
    RecallcardComponent,
    RecallcardLearnComponent,
    RecallcardManageComponent,
    RecallcardLessonComponent,
    MulticardsComponent,
    RandomcardsComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, BrowserAnimationsModule]
})
export class RecallcardModule {}
