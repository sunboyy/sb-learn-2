import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [AdminComponent, UserManagementComponent],
  providers: [AdminService],
  imports: [CommonModule, SharedModule, UserModule, FormsModule, AdminRoutingModule]
})
export class AdminModule {}
