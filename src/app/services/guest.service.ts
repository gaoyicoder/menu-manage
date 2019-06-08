import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

	public serverUrl = environment.serverUrl;
  constructor(
  	private http: HttpClient,
  ) { }

  getGuests(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/users', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
