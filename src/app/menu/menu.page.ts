import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { MenuPopComponent } from '../components/menu-pop/menu-pop.component';
import { MenuService } from '../services/menu.service';
import { MenuTypeService } from '../services/menu-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuData = [];
  random;
  menuTypeData = [];

  constructor(
    private popCtrl: PopoverController,
    private alertCtrl: AlertController,
    private menuService: MenuService,
    private menuTypeService: MenuTypeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuTypeData = [];
    this.menuData = [];
    this.menuTypeService.getMenuTypes({'sort': 'sequence'}).then((typeData:any) => {
      if (typeData) {
        typeData.forEach((oldMenuType) => {
          this.menuTypeData[oldMenuType.id] = oldMenuType.typeName;
        });
        this.menuService.getMenus({'sort': 'sequence'}).then((data:any) => {
          data.forEach((oldMenu) => {
            if (typeof(this.menuData[oldMenu.menuTypeId]) == "undefined") {
              this.menuData[oldMenu.menuTypeId] = new Array();
            }
            this.menuData[oldMenu.menuTypeId].push(oldMenu);
          });
        });

      }
    });
    this.random = Math.random();
  }

  ionViewDidEnter() { 
  }
  addMenu() {
    this.router.navigate(['tabs/menu-detail'], { queryParams: {menu: ""}});
  }

  setSoldOut(menu) {
    menu.isSoldOut = 1;
    this.menuService.updateMenu(menu);
  }

  setOnSale(menu) {
    menu.isSoldOut = 0;
    this.menuService.updateMenu(menu);
  }

  editMenu(menu, slidingItem) {
    this.router.navigate(['tabs/menu-detail'], { queryParams: {menu: JSON.stringify(menu)}});
    slidingItem.close();
  }

  async confirmDelete(menuType, slidingItem) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该菜品',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteMenu(menuType, slidingItem);
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

  deleteMenu(menu, slidingItem) {
    this.menuService.deleteMenu(menu).then((data) => {
      this.menuData.splice(this.menuData.findIndex(item => item.id === menu.id), 1);
    });
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
