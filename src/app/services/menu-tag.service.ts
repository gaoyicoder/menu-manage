import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuTagService {

	public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getMenuTag(menu) {
  	let menuId = menu.id == '' ? 0 : menu.id;
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/menu-tags/menu-tag/'+menuId).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
