import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Storage } from '@ionic/storage';
import { commands } from './printer-commands';
import { TextEncoder } from 'text-encoding';
import { AppService } from './app.service';

const printerToken = 'printer-token';
const pageWidth = 32;

@Injectable({
  providedIn: 'root'
})
export class PrinterService {


  constructor( private ble: BLE, private storage: Storage, private appService: AppService ) { }
  searchBluetooth(searchResult){
  		this.ble.scan([], 5).subscribe(searchResult);
  }

  savePrinter(printer) {
    return this.storage.set(printerToken, printer);
  }

  loadPrinter() {
  	return this.storage.get(printerToken);
  }

  printOrder(order) {
    this.loadPrinter().then((printer) => {
      this.ble.peripheralsWithIdentifiers([printer.value]).then(() => {
        this.ble.connect(printer.value).subscribe(result => {
          let service;
          let characteristic;
          result.characteristics.forEach((character)=> {
            if(character.properties.includes("WriteWithoutResponse")) {
              service = character.service;
              characteristic = character.characteristic;
            }
          });
          let paidStatus = order.isPay? "已结账":"未结账";
          let receipt = commands.HARDWARE.HW_INIT; //Init Printer
          receipt += commands.FF;
          receipt += commands.TEXT_FORMAT.TXT_2HEIGHT; //Set font size 2*normal
          receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT; //Centering
          receipt += "点菜清单 - " + paidStatus + commands.EOL;
          receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT; //Centering
          receipt += "桌号：" + order.tableNum + commands.EOL;
          receipt += commands.TEXT_FORMAT.TXT_NORMAL; //Set font size 2*normal
          receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT; //Centering
          receipt += commands.HORIZONTAL_LINE.HR_58MM + commands.EOL;
          receipt += this.textLabel("订单编号：", order.id) + commands.EOL;
          receipt += this.textLabel("时间：", order.createdAt) + commands.EOL;
          receipt += commands.HORIZONTAL_LINE.HR_58MM + commands.EOL;
          order.detail.forEach(menu => {
            receipt += this.textLabel(menu.menuName, menu.num.toString()) + commands.EOL;
          });
          receipt += commands.HORIZONTAL_LINE.HR3_58MM + commands.EOL;
          receipt += this.textLabel("备注：", order.remarks) + commands.EOL;
          receipt += commands.HORIZONTAL_LINE.HR_58MM + commands.EOL;
          receipt += this.textLabel("操作员：", this.appService.user.username) + commands.EOL;


          let data = new TextEncoder('gb18030', {
            NONSTANDARD_allowLegacyEncoding: true
          }).encode(receipt);
          let end = this.stringToBytes(commands.EOL+commands.FF+commands.FF);

          data = this.appendBuffer(data, end);
          this.ble.writeWithoutResponse(printer.value, service, characteristic, data).then(() => {
            console.log('print success');
          });
        });
      });
    });
  }


  textLabel(label, text) {
    let remain = pageWidth - this.gblen(label);
    let space = remain - this.gblen(text);

    if (space > 0) {
      return label + this.addSpace(space) + text;
    } else {
      space = pageWidth - this.gblen(text);
      return label + commands.EOL + this.addSpace(space) + text;
    }
  }

  //将字符串转换为Array buffer.
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer as ArrayBuffer;
  }

  //array buffer 拼接
  appendBuffer(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer as ArrayBuffer;
  };

  //添加空格
  addSpace(n) {
    return new Array(n+1).join(' ');
  }

  gblen (string){    
    var len = 0;    
    for (var i=0; i<string.length; i++) {    
      if (string.charCodeAt(i)>127 || string.charCodeAt(i)==94) {    
        len += 2;    
      } else {    
        len ++;
      }    
    }
    console.log(len);
    return len;
  }

}
