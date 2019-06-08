import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { PopoverController } from '@ionic/angular';
import { GuestService } from '../services/guest.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  guestData;
  currentPage = 1;
  constructor(
  	private popCtrl: PopoverController,
    private guestService: GuestService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.guestService.getGuests({}).then((guestData:any) => {
      if (guestData) {
        this.guestData = guestData;
      }
    });
  }

  loadGuestData(event) {
    this.currentPage = this.currentPage + 1;
    this.guestService.getGuests({page: this.currentPage}).then((guestData:any) => {
      if (guestData.length != 0) {
        this.guestData = this.guestData.concat(guestData);
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
