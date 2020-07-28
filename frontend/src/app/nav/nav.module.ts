import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [NavComponent]
})
export class NavModule {}
