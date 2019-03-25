import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

	public serverUrl = environment.serverUrl;

  constructor(private http: HttpClient, private plt: Platform) {}

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
}
