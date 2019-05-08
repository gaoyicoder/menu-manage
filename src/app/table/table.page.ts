import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuPopComponent } from '../components/menu-pop/menu-pop.component';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TableService } from '../services/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

	private tableData = [];
  constructor(
  	private popCtrl: PopoverController,
  	private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private tableService: TableService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

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
    this.tableService.getTables({'sort': 'name'}).then((data:any) => {
      if (data) {
        data.forEach((oldTable) => {
          oldTable.isOld = 1;
        });
      }
      this.tableData = data;
    });
  }

  addNew() {
    this.tableData.push({"id":"","name":"","status":0, "isOld":0});
  }

  async confirmDelete(table) {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '是否确认删除该类别',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.deleteOne(table);
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

  changeTable(table) {
    table.isOld = 0;
  }

  deleteOne(table) {
    if (table.isOld == 1) {
      this.tableService.deleteTable(table).then(data=> {
        this.tableData.splice(this.tableData.findIndex(item => item.id === table.id), 1);
      });
    } else {
      this.tableData.splice(this.tableData.findIndex(item => item.id === table.id), 1);
    }
  }

  save() {
    let isValid = true;
    this.tableData.forEach((data)=> {
      if(data.name==='') {
        this.presentToast("保存失败，桌号名称不能为空");
        isValid = false; 
      }
    });
    if (isValid) {
      this.tableService.saveAll(this.tableData).then((data:any) => {
        if(data.status == 200) {
          this.presentToast('保存成功');
          if (data.data) {
            data.data.forEach((oldTable) => {
              oldTable.isOld = 1;
            });
          }
          this.tableData = data.data;
        } else {
          this.presentToast('保存失败，请稍后再试');
        }
      });
    }
  }

  async showCode(table) {
    if(table.isOld === 0) {
      this.presentToast('请先保存');
    } else {
      let loader = await this.loadingCtrl.create({
        message: "正在生成",
      });
      loader.present();
      this.tableService.showCode(table).then((data:any) => {
        if (data.status == 200) {
          this.router.navigate(['table-code'], { queryParams: {tableName:table.name, codeUrl: data.url}});
        } else {
          this.presentToast('生成失败，请稍后再试');
        }
        loader.dismiss();
      });
    }
  }
}
