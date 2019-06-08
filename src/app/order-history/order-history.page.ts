import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPopComponent } from '../components/order-pop/order-pop.component';
import { PopoverController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  orderData;
  currentPage = 1;
  orderStatusList = {0: '未打印', 1: '已打印', 2: '已取消'};

  constructor(
  	private orderService: OrderService, 
    private http: HttpClient,
    private popCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.orderService.getOrders({'sort': '-createdAt'}).then(data => {
      this.orderData = data;
    });
  }

  loadOrderData(event) {
    this.currentPage = this.currentPage + 1;
    this.orderService.getOrders({'page': this.currentPage, 'sort': '-createdAt'}).then((guestData:any) => {
      if (guestData.length != 0) {
        this.orderData = this.orderData.concat(guestData);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
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
