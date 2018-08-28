import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from 'src/app/services/admin/user/user';
import {UserService} from 'src/app/services/admin/user/user.service';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title: string = 'User';
  users: User[];

  constructor(
    private loginService: LoginService
    , private clientContextService: ClientContextService
    , private userService: UserService
    , private router: Router
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.get(this.clientContextService.getToken())
      .subscribe(users => {
          this.users = users;
        },
        error => {
          this.router.navigate(['login']).then();
        }
      );
  }


}
