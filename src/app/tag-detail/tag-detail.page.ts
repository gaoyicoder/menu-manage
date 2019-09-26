import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.page.html',
  styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
	public tagObj:any = {};

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  	private tagService: TagService,
  ) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
  	if(this.route.pathFromRoot[0].snapshot.queryParams.tag!=="") {
      this.tagObj = JSON.parse(this.route.pathFromRoot[0].snapshot.queryParams.tag);
    } else {
    	this.tagObj = {
        id:'',
        templateName:'',
        required: 0,
        multipled: 0,
        detail: [
        	{
        		name: "",
        		price: 0,
        	},
        ],
      };
    }
  }
  ionViewDidEnter() {
  }

  addTag() {
    this.tagObj.detail.push({name: "", price: 0});
  }

  removeTag(detailRow) {
    this.tagObj.detail.splice(this.tagObj.detail.findIndex(item=> item.name === detailRow.name), 1);
  }

  save() {
  	if (this.tagObj.templateName == ""||this.tagObj.detail.length==0) {
  		this.presentToast("保存失败，类型名称或类型顺序不能为空");
  	} else {
  		this.tagService.saveTag(this.tagObj);
  		this.router.navigate(['/tabs/menu/tag']);
  	}
  }

  async confirmDelete(detailRow) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该规格',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.removeTag(detailRow);
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

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

}
