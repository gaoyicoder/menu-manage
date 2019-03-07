import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
  	this.userService.logout();
  }

}
