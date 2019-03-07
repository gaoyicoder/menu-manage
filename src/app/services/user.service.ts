import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

	public authToken = 'auth-token';
  public authenticationState;
  public serverUrl = environment.serverUrl;

  constructor(private storage: Storage, private plt: Platform, private router: Router, private alertCtrl: AlertController, private http: HttpClient) {
    let prompt = this.alertCtrl.create({});
    this.authenticationState = new BehaviorSubject({status:0,alert: prompt});
  	this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    let prompt = this.alertCtrl.create({});
    this.storage.get(this.authToken).then(res => {
      if (res) {
        this.authenticationState.next({status:1,alert: prompt});
      }
    })
  }

  login(username, password, prompt) {
    let httpParams = new HttpParams();
    httpParams.set('username', username);
    httpParams.set('password', password);

    this.http.get(this.serverUrl+'/admin/login', {params: httpParams})
    .subscribe( data => {

    });
    return this.authenticationState.next({status:2,alert: prompt});
    // return this.storage.set(this.authToken, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(1);
    // });
  }

  logout() {
    let prompt = this.alertCtrl.create({});
    return this.storage.remove(this.authToken).then(() => {
      this.authenticationState.next({status:0,alert: prompt});
    });
  }

  isAuthenticated() {
    return this.authenticationState.value.status;
  }

  subscribeAuthState(returnUrl) {
    this.authenticationState.subscribe(result => {
      if (result.status == 1) {
        this.router.navigate([returnUrl]);
      } else if(result.status == 0){
        this.router.navigate(['/login']);
      } else if (result.status == 2){
        result.alert.then(alert => { alert.present(); });
      }
    });
  }

}
