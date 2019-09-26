import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountTypeService {

	public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getDiscountTypes(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/discount-types', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteDiscountType(discountType) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/discount-types/'+ discountType.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveAll(discountTypeList) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/discount-types/save-all', {'params': discountTypeList}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
