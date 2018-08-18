import {Component, OnInit} from '@angular/core';

import {User} from 'src/app/services/user/user';
import {UserService} from 'src/app/services/user/user.service';
import {InfoService} from 'src/app/services/info/info.service';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'User';

  constructor(
    private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService
    , private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  onClick_Search() {
    this.userService.get(this.clientContextService.getToken())
      .subscribe(result => {
          this.infoService.showInfo('onClick_Search() ok');
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          // 'onCompleted' callback route to new page here
        }
      );
  }



}
