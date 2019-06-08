import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PrinterService } from '../services/printer.service';
import { PopoverController } from '@ionic/angular';
import { OrderPopComponent } from '../components/order-pop/order-pop.component';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  orderData;
  newOrderList = [];
  orderStatusList = {0: '未打印', 1: '已打印', 2: '已取消'};
  orderStatusId = 0;
  autoPrintOrder = false;
  currentPage = 1;

  constructor(
    private orderService: OrderService, 
    private http: HttpClient,
    private printer: PrinterService,
    private popCtrl: PopoverController,
    private insomnia: Insomnia,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    
    this.insomnia.keepAwake()
    .then(
      () => console.log('keep alive success'),
      () => console.log('keep alive error')
    );

    this.currentPage = 1;
    this.getOrders();

    this.orderService.connectToSocket(this);
  }

  ionViewWillLeave() {
    this.insomnia.allowSleepAgain()
    .then(
      () => console.log('stop keep alive success'),
      () => console.log('stop keep alive error')
    );

    this.orderService.disconnectToSocket();
  }

  getOrders() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var today = year + '-' + month + '-' + day;
    this.orderService.searchOrders({'createdAt': today, 'sort': '-createdAt'}).then(data => {
      this.orderData = data;
    });
  }

  printOrder(order) {
    return new Promise(resolve=>{
      this.printer.printOrder(order).then(()=>{
        order.status = 1;
        this.orderService.putOrder(order).then(()=> {
          resolve();
        });
      });
    });
  }

  cancelOrder(order) {
    order.status = 2;
    this.orderService.putOrder(order).then(() => {
      this.getOrders();
    });
  }

  loadOrderData(event) {
    this.currentPage = this.currentPage + 1;
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var today = year + '-' + month + '-' + day;
    this.orderService.searchOrders({'createdAt': today, 'sort': '-createdAt', 'page': this.currentPage}).then((guestData: any) => {
      if (guestData.length != 0) {
        this.orderData = this.orderData.concat(guestData);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
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
