import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public loginForm: FormGroup;
  public submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private alertCtrl: AlertController) {
  	this.loginForm = this.formBuilder.group({
  		username: ['', Validators.required],
  		password: ['', Validators.required],
  	});
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      if(this.userService.authenticationState.observers === undefined || this.userService.authenticationState.observers.length == 0) {
        this.userService.subscribeAuthState('/tabs/index');
      }
      let prompt = this.alertCtrl.create({
        header: '登录失败',
        message: '用户名或密码错误',
      });
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;
      this.userService.login(username, password, prompt);
    }
  }

}
