import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

	public serverUrl = environment.serverUrl;
  constructor(
  	private http: HttpClient,
  ) { }

  getRecharges(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/recharges', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
