import { Component, OnInit } from '@angular/core';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

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
