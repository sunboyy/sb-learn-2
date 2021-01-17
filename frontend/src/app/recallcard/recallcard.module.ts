import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecallcardLearnComponent } from './recallcard-learn/recallcard-learn.component';
import { MulticardsComponent } from './recallcard-lesson/multicards/multicards.component';
import { QuizComponent } from './recallcard-lesson/quiz/quiz.component';
import { RandomcardsComponent } from './recallcard-lesson/randomcards/randomcards.component';
import { RecallcardLessonComponent } from './recallcard-lesson/recallcard-lesson.component';
import { RecallcardRoutingModule } from './recallcard-routing.module';
import { RecallcardComponent } from './recallcard.component';

@NgModule({
  declarations: [
    RecallcardComponent,
    RecallcardLearnComponent,
    RecallcardLessonComponent,
    MulticardsComponent,
    RandomcardsComponent,
    QuizComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, RecallcardRoutingModule]
})
export class RecallcardModule {}
