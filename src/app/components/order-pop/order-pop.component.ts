import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order-pop',
  templateUrl: './order-pop.component.html',
  styleUrls: ['./order-pop.component.scss'],
})
export class OrderPopComponent implements OnInit {

  constructor(
    private router: Router,
  	private navParams: NavParams,
  	private popCtrl: PopoverController
  ) { }

  ngOnInit() {}

  jumpTo(link) {
    this.popCtrl.dismiss();
    this.router.navigate([link]);
  }

}
