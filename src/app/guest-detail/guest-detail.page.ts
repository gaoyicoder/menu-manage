import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { DiscountTypeService } from '../services/discount-type.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.page.html',
  styleUrls: ['./guest-detail.page.scss'],
})
export class GuestDetailPage implements OnInit {

	public guestForm: FormGroup;
  public discountList:any = [];
	public guestObj:any = {};
  public phoneInput = false;
  public guestOrder = {
    num: 0,
    subtotal: 0,
    list: [],
    total: "",
  };
  public orderStatusList = {0: '未打印', 1: '已打印', 2: '已取消'};
  constructor(
    private toastCtrl: ToastController,
  	private formBuilder: FormBuilder,
  	private route: ActivatedRoute,
  	private router: Router,
    private guestService: GuestService,
    private discountTypeService: DiscountTypeService,
  ) {
  	this.guestForm = this.formBuilder.group({
  		phoneNumber: [''],
  		remark: [''],
      discount: [0],
      discountFromDate: ['0000-00-00'],
      discountToDate: ['0000-00-00'],
  	});
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.guestOrder = {
      num: 0,
      subtotal: 0,
      list: [],
      total: ""

    };
    this.phoneInput = false;
  	if(this.route.pathFromRoot[0].snapshot.queryParams.guest!=="") {
      this.guestObj = JSON.parse(this.route.pathFromRoot[0].snapshot.queryParams.guest);
      this.guestForm.controls['phoneNumber'].setValue(this.guestObj.phoneNumber);
    	this.guestForm.controls['remark'].setValue(this.guestObj.remark);
      this.guestForm.controls['discount'].setValue(this.guestObj.discount);
      if (this.guestObj.discountFromDate) {
        this.guestForm.controls['discountFromDate'].setValue(this.guestObj.discountFromDate);
      }
      if (this.guestObj.discountFromDate) {
        this.guestForm.controls['discountToDate'].setValue(this.guestObj.discountToDate);
      }
      if (this.guestObj.phoneNumber) {
        this.phoneInput = true;
      }
    }
    this.guestService.getGuestDetail(this.guestObj.id, {expand:'order'}).then((guestData:any)=> {
      this.guestOrder.num = guestData.order.length;
      let i = 0;
      guestData.order.forEach((data:any) => {
        this.guestOrder.subtotal = this.guestOrder.subtotal + data.subtotal;
        if (i < 5) {
          this.guestOrder.list.push(data);
          i++;
        }
      });
      this.guestOrder.total = this.guestOrder.subtotal.toFixed(2);
    });

    this.discountTypeService.getDiscountTypes({'sort': 'discount'}).then((data:any) => {
      this.discountList = data;
    });
  }

  onSubmit() {
    if (this.guestForm.invalid) {
      return false;
    } else {
      this.guestObj.phoneNumber = this.guestForm.value.phoneNumber;
      this.guestObj.remark = this.guestForm.value.remark;
      this.guestObj.discount = this.guestForm.value.discount;
      this.guestObj.discountFromDate = this.guestForm.value.discountFromDate;
      this.guestObj.discountToDate = this.guestForm.value.discountToDate;
      if (this.guestObj.discount > 0) {
        if (this.guestObj.discountFromDate == '0000-00-00' || this.guestObj.discountToDate == '0000-00-00') {
          this.presentToast("保存失败，已选折扣，折扣起止日期不能为空");
          return false;
        }
      } else {
        this.guestObj.discountFromDate = "";
        this.guestObj.discountToDate = "";
      }
      this.guestService.saveGuest(this.guestObj);
      this.router.navigate(['/tabs/guest']);
    }
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

}
