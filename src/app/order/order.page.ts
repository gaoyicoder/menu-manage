import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PrinterService } from '../services/printer.service';
import { PopoverController } from '@ionic/angular';
import { OrderPopComponent } from '../components/order-pop/order-pop.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderData;
  rowNum;
  orderStatusList = {0: '未确认', 1: '已确认', 2: '已取消'};
  orderStatusId = 0;
  refreshTimeInterval = 10000;
  intervalObj;

  constructor(
    private orderService: OrderService, 
    private http: HttpClient,
    private printer: PrinterService,
    private popCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.intervalObj = this.refreshOrders();
  }

  ionViewWillLeave() {
    clearInterval(this.intervalObj);
  }

  refreshOrders() {
    this.getOrders();
    return setInterval(() => { 
       this.getOrders();
    }, this.refreshTimeInterval);
  }

  getOrders() {
    this.orderService.getOrders({'filter[status]': this.orderStatusId, 'sort': '-createdAt'}).then(data => {
      this.orderData = data;
      this.orderData.forEach((item, index) => {
        let num = Math.ceil(this.orderData[index].detail.length/3);
        this.orderData[index].detailRowNum = Array(num).fill(1).map((x, i) => i);
        this.orderData[index].detailColNum = Array(3).fill(1).map((x, i) => i);
      });
    });
  }

  printOrder(order) {
    this.printer.printOrder(order);
    order.status = 1;
    this.orderService.putOrder(order).then(()=> {
      this.getOrders();
    });
  }

  cancelOrder(order) {
    // this.printer.printOrder(order);
    order.status = 2;
    this.orderService.putOrder(order).then(() => {
      this.getOrders();
    });
  }

  async presentPop(ev: any) {
    const popover = await this.popCtrl.create(
      {
        component: OrderPopComponent,
        event: ev,
        translucent: true,
        cssClass: 'menu-popover-style',
        componentProps : {
          "orderPage": this
        }
      }
    );
    return await popover.present();
  }
}
