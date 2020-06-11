import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RecallcardLearnComponent } from './recallcard/recallcard-learn/recallcard-learn.component';
import { RecallcardManageComponent } from './recallcard/recallcard-manage/recallcard-manage.component';
import { RecallcardComponent } from './recallcard/recallcard.component';

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
      { path: 'manage', component: RecallcardManageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
