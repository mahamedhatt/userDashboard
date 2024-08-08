import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe(
      (data) => {
        this.users = data.data;
        this.totalPages = data.total_pages;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  viewUserDetails(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUsers(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers(this.currentPage);
    }
  }
}
