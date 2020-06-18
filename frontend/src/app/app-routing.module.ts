import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RecallcardLearnComponent } from './recallcard/recallcard-learn/recallcard-learn.component';
import { RecallcardLessonComponent } from './recallcard/recallcard-lesson/recallcard-lesson.component';
import { RecallcardManageComponent } from './recallcard/recallcard-manage/recallcard-manage.component';
import { RecallcardComponent } from './recallcard/recallcard.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: '**', redirectTo: 'sign-in' }
    ]
  },
  {
    path: 'recallcard',
    component: RecallcardComponent,
    children: [
      { path: '', redirectTo: 'learn', pathMatch: 'full' },
      { path: 'learn', component: RecallcardLearnComponent },
      { path: 'manage', component: RecallcardManageComponent },
      { path: 'lesson/:lessonId/:playMode', component: RecallcardLessonComponent }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [{ path: 'change-password', component: ChangePasswordComponent }]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [{ path: 'user', component: UserManagementComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
