import { Component, OnInit } from '@angular/core';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  constructor(
  	private popCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async presentPop(ev: any) {
  	const popover = await this.popCtrl.create({
  		component: GuestPopComponent,
      event: ev,
      translucent: true,
      cssClass: 'guest-popover-style'
  	});
  	return await popover.present();
  }

}
