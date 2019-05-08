import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RechargeTypeService {

	public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getRechargeTypes(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/recharge-types', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteRechargeType(rechargeType) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/recharge-types/'+rechargeType.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveAll(rechargeTypeList) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/recharge-types/save-all', {'params': rechargeTypeList}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
