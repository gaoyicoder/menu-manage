import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppService } from './app.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const authToken = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public authenticationState;
  public serverUrl = environment.serverUrl;

  constructor(
    private storage: Storage, 
    private plt: Platform, private router: Router, 
    private alertCtrl: AlertController, private http: HttpClient,
    private appService: AppService,
    private jwtHelper: JwtHelperService
  ) {
    let prompt = this.alertCtrl.create({});
    this.authenticationState = new BehaviorSubject({status:0,alert: prompt});
  	this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  static getTokenPromise(storage: Storage) {
    //TODO: Can add token expire verification date in this function.
    return storage.get(authToken);
  }

  checkToken() {
    let prompt = this.alertCtrl.create({});
    UserService.getTokenPromise(this.storage).then(res => {
      if (res) {
        this.appService.user = this.jwtHelper.decodeToken(res);
        this.authenticationState.next({status:1,alert: prompt});
      }
    })
  }

  login(username, password, alertCtrl) {
    let formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    formData.append('accessToken', environment.accessToken);

    let alertFail = alertCtrl.create({
      header: '登录失败',
      message: '用户名或密码错误',
    });

    let alertError = alertCtrl.create({
      header: '服务器出错',
      message: '服务器出错，请稍后再试',
    });
    let prompt = this.alertCtrl.create({});

    this.http.post(this.serverUrl+'/admin/login', formData)
    .subscribe(
      data => {
        if (data['status'] == 200) {
          this.storage.set(authToken, data['token']).then(() => {
            this.appService.user = this.jwtHelper.decodeToken(data['token']);
            this.authenticationState.next({status:1,alert: prompt});
          });
        } else {
          return this.authenticationState.next({status:2,alert: alertFail});
        }
      },
      err => {
        return this.authenticationState.next({status:2,alert: alertError});
      }
    );
  }

  logout() {
    let prompt = this.alertCtrl.create({});
    return this.storage.remove(authToken).then(() => {
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
