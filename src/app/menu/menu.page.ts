import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuPopComponent } from '../components/menu-pop/menu-pop.component';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuData;
  random;

  constructor(
    private popCtrl: PopoverController,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuService.getMenus({'sort': 'sequence'}).then(data => {
      this.menuData = data;
    });
    this.random = Math.random();
  }

  ionViewDidEnter() { 
  }
  addMenu() {
    this.router.navigate(['tabs/menu-detail'], { queryParams: {menu: ""}});
  }

  editMenu(menu, slidingItem) {
    this.router.navigate(['tabs/menu-detail'], { queryParams: {menu: JSON.stringify(menu)}});
    slidingItem.close();
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
