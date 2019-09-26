import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { DiscountTypeService } from '../services/discount-type.service';

@Component({
  selector: 'app-discount-type',
  templateUrl: './discount-type.page.html',
  styleUrls: ['./discount-type.page.scss'],
})
export class DiscountTypePage implements OnInit {
  discountTypeData;
  constructor(
  	private popCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private discountTypeService: DiscountTypeService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.discountTypeService.getDiscountTypes({'sort': 'discount'}).then((data:any) => {
      if (data) {
        data.forEach((oldDiscountType) => {
          oldDiscountType.isOld = 1;
        });
      }
      this.discountTypeData = data;
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentPop(ev: any) {
  	const popover = await this.popCtrl.create({
  		component: GuestPopComponent,
      event: ev,
      translucent: true,
      cssClass: 'guest-popover-style'
  	});
  	return await popover.present();
  }

  addNew() {
    this.discountTypeData.push({"id":"", "discount":0});
  }

  deleteOne(discountType) {
    if (discountType.isOld == 1) {
      this.discountTypeService.deleteDiscountType(discountType).then(data=> {
        this.discountTypeData.splice(this.discountTypeData.findIndex((item) => item.id === discountType.id&&item.discount===discountType.discount?true:false), 1);
      });
    } else {
      this.discountTypeData.splice(this.discountTypeData.findIndex((item) => item.id === discountType.id&&item.discount===discountType.discount?true:false), 1);
    }
  }

  async confirmDelete(discountType) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该类型',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteOne(discountType);
            alert.dismiss();
          }
        },
        {
          text: '取消',
          handler: () => {
            alert.dismiss();
          }
        },
      ],
    });
    await alert.present();
  }

  save() {
    let isValid = true;
    this.discountTypeData.forEach((data)=> {
      if(data.discount===''||data.discount===0) {
        this.presentToast("保存失败，折扣值不能为空");
        isValid = false; 
      }
      if (data.discount>100) {
        this.presentToast("保存失败，折扣值不能大于100");
        isValid = false; 
      }
    });
    if (isValid) {
      this.discountTypeService.saveAll(this.discountTypeData).then((data:any) => {
        if(data.status == 200) {
          this.presentToast('保存成功');
          if (data.data) {
            data.data.forEach((oldDiscountType) => {
              oldDiscountType.isOld = 1;
            });
          }
          this.discountTypeData = data.data;
        } else {
          this.presentToast('保存失败，请稍后再试');
        }
      });
    }
  }

}
