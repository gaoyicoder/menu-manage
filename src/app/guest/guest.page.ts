import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { PopoverController } from '@ionic/angular';
import { GuestService } from '../services/guest.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  guestData;
  guestSearchForm: FormGroup;
  search:any = {};
  constructor(
  	private popCtrl: PopoverController,
    private guestService: GuestService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.guestSearchForm = this.formBuilder.group({
      phoneNumber: [''],
      remark: [''],
    });
  }

  ngOnInit() {
  }

  reloadPage() {
    this.guestSearchForm = this.formBuilder.group({
      phoneNumber: [''],
      remark: [''],
    });
    this.searchGuests();
  }

  searchGuests() {
    this.search = {};
    this.infiniteScroll.disabled = false;

    this.search.phoneNumber = this.guestSearchForm.value.phoneNumber;
    this.search.remark = this.guestSearchForm.value.remark;
    this.search.sort = "-orderNum";
    this.search.page = 1;

    this.guestService.getGuests(this.search).then(data => {
      if (data) {
        this.guestData = data;
      }
    });
  }
  ionViewWillEnter() {
    this.reloadPage();
  }

  loadGuestData(event) {
    this.search.page = this.search.page + 1;

    this.guestService.getGuests({page: this.search.page, sort:'-orderNum'}).then((guestData:any) => {
      if (guestData.length != 0) {
        this.guestData = this.guestData.concat(guestData);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
  }
  editGuest(guest) {
    this.router.navigate(['tabs/guest-detail'], { queryParams: {guest: JSON.stringify(guest)}});
  }

  onSubmit() {
    this.searchGuests();
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
