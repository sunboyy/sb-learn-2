import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/shared/status.service';
import { User } from '../../user/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];

  isLoadingSelfRegistration = false;
  allowSelfRegistration: boolean;

  constructor(private adminService: AdminService, private statusService: StatusService) {}

  ngOnInit(): void {
    this.statusService.getStatus().subscribe((status) => {
      this.allowSelfRegistration = status.allowSelfRegistration;
    });
    this.adminService.getAllUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  onSaveSelfRegistration(): void {
    this.isLoadingSelfRegistration = true;
    this.adminService
      .setAllowSelfRegistration(this.allowSelfRegistration ? 1 : 0)
      .subscribe((result) => {
        this.isLoadingSelfRegistration = false;
        this.allowSelfRegistration = Boolean(result.data.value);
      });
  }
}
