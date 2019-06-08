import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { PopoverController } from '@ionic/angular';
import { RechargeService } from '../services/recharge.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  rechargeData;
  currentPage = 1;
  constructor(
  	private popCtrl: PopoverController,
    private rechargeService: RechargeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.rechargeService.getRecharges({'expand': 'user'}).then((rechargeData:any) => {
      if (rechargeData) {
        this.rechargeData = rechargeData;
      }
    });
  }

  loadRechargeData(event) {
    this.currentPage = this.currentPage + 1;
    this.rechargeService.getRecharges({page: this.currentPage}).then((guestData:any) => {
      if (guestData.length != 0) {
        this.rechargeData = this.rechargeData.concat(guestData);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
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
