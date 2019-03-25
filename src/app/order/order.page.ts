import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PrinterService } from '../services/printer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderData;
  rowNum;
  orderStatusList = {0: '未确认', 1: '已确认', 2: '已取消'};

  constructor(
    private orderService: OrderService, 
    private http: HttpClient,
    private printer: PrinterService
  ) { }

  ngOnInit() {
  	this.orderService.getOrders({'sort': '-createdAt'}).then(data => {
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
    this.orderService.putOrder(order);
  }

  cancelOrder(order) {
    this.printer.printOrder(order);
    order.status = 2;
    this.orderService.putOrder(order);
  }
}
