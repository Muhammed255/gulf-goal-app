import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = "assets/img/users/user.jpg";
  constructor(public userService: UserService) { }

  user: any;

  ngOnInit() {
    this.userService.findOneUser(localStorage.getItem("userId")).subscribe(response => {
      if(response.success) {
        this.user = response.user;
      }
    })
  }

}
