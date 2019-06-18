import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { UserService } from './user.service';
import { Media } from '@ionic-native/media/ngx';

import WebsocketHeartbeatJs from 'websocket-heartbeat-js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

	public serverUrl = environment.serverUrl;
  public socketUrl = environment.socketUrl;
  public ws = null;

  constructor(
    private http: HttpClient, 
    private plt: Platform,
    private storage: Storage,
    private media: Media
  ) {}

  getOrders(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/orders', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  putOrder(order) {
    return new Promise(resolve=>{
      this.http.put(this.serverUrl+'/orders/'+order.id, order).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  orderBalance(fromDate, toDate) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/orders/balance', {fromDate: fromDate, toDate: toDate}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  searchOrders(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/orders/search', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  connectToSocket(orderPage) {
    var that = this;
    UserService.getTokenPromise(this.storage).then(res => {
      if (res) {
        this.ws = new WebsocketHeartbeatJs({
          url: this.socketUrl+':9501'+'?token='+res
        });
        this.ws.onopen = function () {
          orderPage.presentToast("接单服务器连接成功");
        };
        this.ws.onmessage = function (msg) 
        { 
          if (msg.data != 'heartbeat') {
            var order = JSON.parse(msg.data);
            orderPage.orderData.unshift(order);
            const file = that.media.create('/assets/audio/order.mp3');
            file.onStatusUpdate.subscribe(status => console.log(status));
            file.onSuccess.subscribe(() => console.log('Action is successful'));
            file.onError.subscribe(error => console.log('Error!', error));
            file.play();
            orderPage.printOrder(order);
          }
        };

        this.ws.onclose = function (e) {
          console.log(e)
        }
      }
    });
  }

  disconnectToSocket() {
    this.ws.close();
    this.ws = null;
    console.log('Close socket');
  }
}
