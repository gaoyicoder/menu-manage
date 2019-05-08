import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuTypeService } from '../services/menu-type.service';
import { MenuPopComponent } from '../components/menu-pop/menu-pop.component';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-type',
  templateUrl: './menu-type.page.html',
  styleUrls: ['./menu-type.page.scss'],
})
export class MenuTypePage implements OnInit {
  menuTypeData;

  constructor(
    private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private alertCtrl: AlertController,
    private menuTypeService: MenuTypeService,
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
    this.menuTypeService.getMenuTypes({'sort': 'sequence'}).then((data:any) => {
      if (data) {
        data.forEach((oldMenuType) => {
          oldMenuType.isOld = 1;
        });
      }
      this.menuTypeData = data;
    });
  }

  addNew() {
    this.menuTypeData.push({"id":"","typeName":"","sequence":0, "isOld":0});
  }

  async confirmDelete(menuType) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该类别',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteOne(menuType);
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
  deleteOne(menuType) {
    if (menuType.isOld == 1) {
      this.menuTypeService.deleteMenuType(menuType).then(data=> {
        if(data == "has_menu") {
          this.presentToast("删除失败，该类型下还有菜品，请先删除菜品");
        } else {
          this.menuTypeData.splice(this.menuTypeData.findIndex(item => item.id === menuType.id), 1);
        }
      });
    } else {
      this.menuTypeData.splice(this.menuTypeData.findIndex(item => item.id === menuType.id), 1);
    }
  }

  save() {
    let isValid = true;
    this.menuTypeData.forEach((data)=> {
      if(data.typeName===''||data.sequence==='') {
        this.presentToast("保存失败，类型名称或类型顺序不能为空");
        isValid = false; 
      }
    });
    if (isValid) {
      this.menuTypeService.saveAll(this.menuTypeData).then((data:any) => {
        if(data.status == 200) {
          this.presentToast('保存成功');
          if (data.data) {
            data.data.forEach((oldMenuType) => {
              oldMenuType.isOld = 1;
            });
          }
          this.menuTypeData = data.data;
        } else {
          this.presentToast('保存失败，请稍后再试');
        }
      });
    }
  }

  async presentPop(ev: any) {
  	const popover = await this.popCtrl.create({
  		component: MenuPopComponent,
      event: ev,
      translucent: true,
      cssClass: 'menu-popover-style'
  	});
  	return await popover.present();
  }
}
