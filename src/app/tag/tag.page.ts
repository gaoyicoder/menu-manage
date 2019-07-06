import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuPopComponent } from '../components/menu-pop/menu-pop.component';
import { TagService } from '../services/tag.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
})
export class TagPage implements OnInit {

	public tagData = [];

  constructor(
  	private popCtrl: PopoverController,
  	private tagService: TagService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async confirmDelete(tag) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该味型',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteOne(tag);
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

  deleteOne(tag) {
    this.tagService.deleteTag(tag).then(data=> {
      this.tagData.splice(this.tagData.findIndex(item => item.id === tag.id), 1);
    });
  }
  addTag() {
    this.router.navigate(['tabs/tag-detail'], { queryParams: {tag: ""}});
  }
  editMenu(tag) {
    this.router.navigate(['tabs/tag-detail'], { queryParams: {tag: JSON.stringify(tag)}});
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

  ionViewWillEnter() {
    this.tagService.getTags({'sort': 'name'}).then((data:any) => {
      this.tagData = data;
    });
  }

}
