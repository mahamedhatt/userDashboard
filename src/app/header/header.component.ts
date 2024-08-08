import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchInput: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.search$.subscribe((userId) => {
      if (userId) {
        this.userService.getUser(Number(userId)).subscribe((user) => {
          if (user) {
            this.router.navigate([`/user/${userId}`]);
          } else {
            this.router.navigate([``]);
          }
        });
      } else {
        this.router.navigate([``]);
      }
    });
  }

  onSearch(event: any) {
    this.userService.search$.next(event);
  }
}
