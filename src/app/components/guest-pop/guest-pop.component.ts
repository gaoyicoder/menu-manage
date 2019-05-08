import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-guest-pop',
  templateUrl: './guest-pop.component.html',
  styleUrls: ['./guest-pop.component.scss'],
})
export class GuestPopComponent implements OnInit {

  constructor(
  	private router: Router,
  	private popCtrl: PopoverController
  ) { }

  ngOnInit() {}

  test() {
    console.log(11111);
  }
  jumpTo(link) {
  	this.popCtrl.dismiss();
  	this.router.navigate([link]);
  }

}
