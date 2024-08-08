import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}
  id!: any;
  ngOnInit() {
    this.route.paramMap.subscribe(() => this.getuser());
  }
  getuser() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService
        .getUser(+this.id)
        .subscribe((user) => (this.user = user));
    } else {
      // Handle the case where id is null, e.g., navigate back to the list or show an error message.
      console.error('User ID is null');
      this.router.navigate(['/']);
    }
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
