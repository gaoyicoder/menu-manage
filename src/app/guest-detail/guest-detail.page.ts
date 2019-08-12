import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.page.html',
  styleUrls: ['./guest-detail.page.scss'],
})
export class GuestDetailPage implements OnInit {

	public guestForm: FormGroup;
	public guestObj;
  public phoneInput = false;
  public guestOrder = {
    num: 0,
    subtotal: 0,
    list: [],
    total: "",
  };
  public orderStatusList = {0: '未打印', 1: '已打印', 2: '已取消'};
  constructor(
  	private formBuilder: FormBuilder,
  	private route: ActivatedRoute,
  	private router: Router,
    private guestService: GuestService,
  ) {
  	this.guestForm = this.formBuilder.group({
  		phoneNumber: [''],
  		remark: [''],
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
  }

  onSubmit() {
    if (this.guestForm.invalid) {
      return false;
    } else {
      this.guestObj.phoneNumber = this.guestForm.value.phoneNumber;
      this.guestObj.remark = this.guestForm.value.remark;
      this.guestService.saveGuest(this.guestObj);
      this.router.navigate(['/tabs/guest']);
    }
  }

}
