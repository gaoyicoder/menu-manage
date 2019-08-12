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
      this.http.get(this.serverUrl+'/users/search', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  getGuestDetail(id, params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/users/'+id, {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveGuest(guest) {
    if (guest.id != '') {
      return new Promise(resolve=>{
        this.http.put(this.serverUrl+'/users/'+guest.id, guest).subscribe(
          data => {
            resolve(data);
          }
        );
      });
    }
  }
}
