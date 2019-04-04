import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-pop',
  templateUrl: './menu-pop.component.html',
  styleUrls: ['./menu-pop.component.scss'],
})
export class MenuPopComponent implements OnInit {

  constructor(
  	private router: Router,
  	private popCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  jumpTo(link) {
  	this.popCtrl.dismiss();
  	this.router.navigate([link]);
  }
}
