import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RechargeTypeService } from '../services/recharge-type.service';
import { GuestPopComponent } from '../components/guest-pop/guest-pop.component';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recharge-type',
  templateUrl: './recharge-type.page.html',
  styleUrls: ['./recharge-type.page.scss'],
})
export class RechargeTypePage implements OnInit {
  rechargeTypeData;

  constructor(
  	private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private alertCtrl: AlertController,
    private rechargeTypeService: RechargeTypeService,
  ) { }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.rechargeTypeService.getRechargeTypes({'sort': 'sequence,realValue'}).then((data:any) => {
      if (data) {
        data.forEach((oldRechargeType) => {
          oldRechargeType.isOld = 1;
        });
      }
      this.rechargeTypeData = data;
    });
  }
  addNew() {
    this.rechargeTypeData.push({"id":"", "realValue":0, "rechargeValue":0, "sequence":0, "isHot":0});
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

  async confirmDelete(rechargeType) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该类别',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteOne(rechargeType);
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

  deleteOne(rechargeType) {
    if (rechargeType.isOld == 1) {
      this.rechargeTypeService.deleteRechargeType(rechargeType).then(data=> {
        this.rechargeTypeData.splice(this.rechargeTypeData.findIndex(item => item.id === rechargeType.id), 1);
      });
    } else {
      this.rechargeTypeData.splice(this.rechargeTypeData.findIndex(item => item.id === rechargeType.id), 1);
    }
  }

  save() {
    let isValid = true;
    this.rechargeTypeData.forEach((data)=> {
      if(data.realValue===''||data.rechargeValue===''||data.sequence===''||data.isHot==='') {
        this.presentToast("保存失败，类型名称、金额或类型顺序不能为空");
        isValid = false; 
      }
    });
    if (isValid) {
      this.rechargeTypeService.saveAll(this.rechargeTypeData).then((data:any) => {
        if(data.status == 200) {
          this.presentToast('保存成功');
          if (data.data) {
            data.data.forEach((oldRechargeType) => {
              oldRechargeType.isOld = 1;
            });
          }
          this.rechargeTypeData = data.data;
        } else {
          this.presentToast('保存失败，请稍后再试');
        }
      });
    }
  }
}
