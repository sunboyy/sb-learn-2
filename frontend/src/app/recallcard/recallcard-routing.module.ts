import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecallcardLearnComponent } from './recallcard-learn/recallcard-learn.component';
import { RecallcardLessonComponent } from './recallcard-lesson/recallcard-lesson.component';
import { RecallcardComponent } from './recallcard.component';

const routes: Routes = [
  {
    path: '',
    component: RecallcardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'learn', pathMatch: 'full' },
      { path: 'learn', component: RecallcardLearnComponent },
      { path: 'lesson/:lessonId/:playMode', component: RecallcardLessonComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecallcardRoutingModule {}
