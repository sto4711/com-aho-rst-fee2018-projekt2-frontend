import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from 'src/app/services/user/user';
import {UserService} from 'src/app/services/user/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title: string = 'User';
  users: User[];

  constructor(
private userService: UserService
    , private router: Router
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
          this.users = users;

        },
        error => {

          this.router.navigate(['login']).then();
        }
      );
  }


}
