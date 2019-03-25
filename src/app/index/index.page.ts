import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { PrinterService } from '../services/printer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})

export class IndexPage implements OnInit {

  deviceList = [];
  selectedPrinter;
  constructor( 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    private printer: PrinterService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.printer.loadPrinter().then(data => {
      this.selectedPrinter = data;
    })
  }

  async presentToast(data) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async getDeviceList() {
    this.deviceList = [];
    this.printer.searchBluetooth((device: any) => {
      let type: 'radio' = 'radio';
      let deviceInput = { name: 'device', type: type, label: device.name, value: device.id};
      let isExist = false;
      this.deviceList.forEach(data => {
        if (data.value == device.id) {
          isExist = true;
        }
      });
      if (device.name.trim() != '' && isExist === false) {
        this.deviceList.push(deviceInput);
      }
    });
    let loading = await this.loadingCtrl.create({
      message: "正在扫描",
      duration: 3000,
    });
    loading.present();
    loading.onDidDismiss().then(async () => {
      let alert = await this.alertCtrl.create({
      header: "请选择打印机",
      inputs: this.deviceList,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '选择',
          handler: (device) => {
            if (!device) {
              this.presentToast("选择一个打印机");
              return false;
            } else {
              this.deviceList.forEach(data => {
                if (data.value == device) {
                  this.printer.savePrinter(data);
                  this.selectedPrinter = data;
                }
              });
            }
            // this.print(device, this.receipt);
          },
        },
      ],
    });
    alert.present();
    });
  }

}
