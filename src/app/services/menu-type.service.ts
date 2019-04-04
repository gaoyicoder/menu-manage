import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuTypeService {

  public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getMenuTypes(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/menu-types', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteMenuType(menuType) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/menu-types/'+menuType.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveAll(menuTypeList) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/menu-types/save-all', {'params': menuTypeList}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
