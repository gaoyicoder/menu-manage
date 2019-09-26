import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

	public serverUrl = environment.serverUrl;
  constructor(
    private http: HttpClient,
    private transfer: FileTransfer,
    private storage: Storage, 
  ) { }

  getMenus(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/menus', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveMenu(menu) {
    if (menu.id == 0) {
      return this.createMenu(menu);
    } else {
      return this.updateMenu(menu);
    }
  }

  createMenu(menu) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/menus', menu).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  updateMenu(menu) {
    return new Promise(resolve=>{
      this.http.put(this.serverUrl+'/menus/'+menu.id, menu).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteMenu(menu) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/menus/'+menu.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
  uploadImage(path, id) {
    return UserService.getTokenPromise(this.storage).then(res => {
      if (res) {
        let options: FileUploadOptions = {
          fileKey: 'ionicfile',
          fileName: 'ionicfile',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: { 'Authorization': 'Bearer ' + res }
        }

        const fileTransfer: FileTransferObject = this.transfer.create();
        return fileTransfer.upload(path, this.serverUrl + '/menus/upload/' + id, options).then(data => {
          return Promise.resolve(data);
        });
      } else {
        return Promise.reject('Can not get token.');
      }
    });
  }
  uploadVideo(path, id) {
    return UserService.getTokenPromise(this.storage).then(res => {
      if (res) {
        let options: FileUploadOptions = {
          fileKey: 'ionicfile',
          fileName: 'ionicfile',
          chunkedMode: false,
          mimeType: "video/mp4",
          headers: { 'Authorization': 'Bearer ' + res }
        }

        const fileTransfer: FileTransferObject = this.transfer.create();
        return fileTransfer.upload(path, this.serverUrl + '/menus/upload-video/' + id, options).then(data => {
          return Promise.resolve(data);
        });
      } else {
        return Promise.reject('Can not get token.');
      }
    });
  }
}
