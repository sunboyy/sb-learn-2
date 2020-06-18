import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((res) => {
      this.users = res.data;
    });
  }
}
