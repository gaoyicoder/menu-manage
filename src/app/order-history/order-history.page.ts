import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPopComponent } from '../components/order-pop/order-pop.component';
import { PopoverController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  orderData;
  orderStatusList = {0: '未打印', 1: '已打印', 2: '已取消'};
  orderHistoryForm: FormGroup;
  search:any = {};

  constructor(
  	private orderService: OrderService, 
    private http: HttpClient,
    private popCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

    this.orderHistoryForm = this.formBuilder.group({
      date: [''],
      bottom: [''],
      top: [''],
      tradeNo: [''],
      menuName: [''],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.reloadPage();
  }

  reloadPage() {
    this.orderHistoryForm = this.formBuilder.group({
      date: [''],
      bottom: [''],
      top: [''],
      tradeNo: [''],
      menuName: [''],
    });
    this.searchOrders();
  }
  searchOrders() {
    this.search = {};
    this.infiniteScroll.disabled = false;
    let formattedDate = "";
    if (this.orderHistoryForm.value.date != "") {
      let selectedDate = new Date(this.orderHistoryForm.value.date);
      formattedDate = selectedDate.getFullYear() + "-" +  (selectedDate.getMonth() + 1) + "-" +  selectedDate.getDate();
    }
    this.search.createdAt = formattedDate;
    this.search.bottom = this.orderHistoryForm.value.bottom;
    this.search.top = this.orderHistoryForm.value.top;
    this.search.tradeNo = this.orderHistoryForm.value.tradeNo;
    this.search.menuName = this.orderHistoryForm.value.menuName;
    this.search.sort = "-createdAt";
    this.search.page = 1;
    this.search.expand = 'user';

    this.orderService.searchOrders(this.search).then(data => {
      this.orderData = data;
    });
  }

  loadOrderData(event) {
    this.search.page = this.search.page + 1;

    this.orderService.searchOrders(this.search).then((guestData:any) => {
      if (guestData.length != 0) {
        this.orderData = this.orderData.concat(guestData);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
  }

  viewGuest(guest) {
    this.router.navigate(['tabs/guest-detail'], { queryParams: {guest: JSON.stringify(guest)}});
  }

  async onSubmit() {
    this.searchOrders();
  }

  async presentPop(ev: any) {
    const popover = await this.popCtrl.create({
      component: OrderPopComponent,
      event: ev,
      translucent: true,
      cssClass: 'order-popover-style',
    });
    return await popover.present();
  }
}
