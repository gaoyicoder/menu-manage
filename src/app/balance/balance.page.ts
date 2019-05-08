import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

	public balanceForm: FormGroup;
  private balance = {};
  private JSON = JSON;
  constructor(
  	private formBuilder: FormBuilder,
  	private toastCtrl: ToastController,
  	private orderService: OrderService
  ) {

  	this.balanceForm = this.formBuilder.group({
  		fromDate: ['', Validators.required],
  		toDate: ['', Validators.required],
  	});
  }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  onSubmit() {
  	if (this.balanceForm.invalid) {
  		this.presentToast('起止时间不能为空');
      return false;
    } else {
    	this.orderService.orderBalance(
    		this.balanceForm.value.fromDate, 
    		this.balanceForm.value.toDate
    	).then((data: any) => {
        this.balance = data;
        console.log(this.balance);
      });
    }
  }
}
