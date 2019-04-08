import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order-pop',
  templateUrl: './order-pop.component.html',
  styleUrls: ['./order-pop.component.scss'],
})
export class OrderPopComponent implements OnInit {

  constructor(
  	private navParams: NavParams,
  	private popCtrl: PopoverController
  ) { }

  ngOnInit() {}

  changeStatus(statusId) {
  	let orderPage = this.navParams.get('orderPage');
  	orderPage.orderStatusId = statusId;
  	orderPage.getOrders();
  	this.popCtrl.dismiss();
  }

}
