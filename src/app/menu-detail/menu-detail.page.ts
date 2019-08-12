import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuTypeService } from '../services/menu-type.service';
import { MenuService } from '../services/menu.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { TagService } from '../services/tag.service';

declare let window: any;

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {

	public menuForm: FormGroup;
  public submitted = false;
  public menuTypeList;
  public tagList;
  private imageResponse: any;

  private imageChanged;
  private videoChanged;

  private imagePath = '';
  private videoPath = '';
  private zero = '0';

	public menuObj = {
    id:'',
    imageUrl:'/assets/images/placeholder.jpg',
    videoUrl:'',
    menuName:'',
    intro:'',
    recipe:'',
    menuTypeId:'',
    tagId: '0',
    price:'',
    sequence: 0
  };
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private menuTypeService: MenuTypeService,
    private camera: Camera,
    private menuService: MenuService,
    private webview: WebView,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private tagService: TagService,
  ) {
  	this.menuForm = this.formBuilder.group({
  		menuName: ['', Validators.required],
      intro: [''],
      recipe: [''],
  		menuTypeId: ['', Validators.required],
      tagId: ['0'],
  		price: ['', Validators.required],
      sequence: [0, Validators.required],
  	});
  }

  ionViewWillEnter() {
    
  }
  ionViewDidEnter() {
    this.submitted = false;
    this.imageChanged = false;
    this.videoChanged = false;
    this.imagePath = '';
    this.videoPath = '';

    if(this.route.pathFromRoot[0].snapshot.queryParams.menu!=="") {
      this.menuObj = JSON.parse(this.route.pathFromRoot[0].snapshot.queryParams.menu);
    } else {
      this.menuObj = {
        id:'',
        imageUrl:'/assets/images/placeholder.jpg',
        videoUrl:'',
        menuName:'',
        intro:'',
        recipe: '',
        menuTypeId:'',
        tagId: '0',
        price:'',
        sequence: 0
      };
    }

    this.menuForm.controls['menuName'].setValue(this.menuObj.menuName);
    this.menuForm.controls['intro'].setValue(this.menuObj.intro);
    this.menuForm.controls['recipe'].setValue(this.menuObj.recipe);
    this.menuForm.controls['price'].setValue(this.menuObj.price);
    this.menuForm.controls['menuTypeId'].setValue(this.menuObj.menuTypeId.toString());
    this.menuForm.controls['tagId'].setValue(this.menuObj.tagId.toString());
    this.menuForm.controls['sequence'].setValue(this.menuObj.sequence);
    this.menuTypeService.getMenuTypes({'sort': 'id'}).then(data => {
      this.menuTypeList = data;
    });
    this.menuTypeService.getMenuTypes({'sort': 'id'}).then(data => {
      this.menuTypeList = data;
    });
    this.tagService.getTags({'sort': 'name'}).then((data:any) => {
      this.tagList = data;
    });
  }
  ngOnInit() {
  }

  pickImage() {
    let sourceType = 0;

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
      targetWidth: 500,
      targetHeight: 500,
    }
    this.camera.getPicture(options).then((imagePath) => {
      this.imagePath = imagePath;
      this.menuObj.imageUrl = this.webview.convertFileSrc(imagePath);
      this.imageChanged = true;
    }, (err) => {
     // Handle error
    });
  }

  pickVideo() {
    let sourceType = 0;

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO,
      correctOrientation: true,
      sourceType:sourceType,
      targetWidth: 500,
      targetHeight: 500,
    }
    this.camera.getPicture(options).then((videoPath) => {
      this.checkSize(videoPath, 20000000);
    }, (err) => {
     // Handle error
    });
  }

  checkSize(fileUri, size) {
    let that = this;
    window.resolveLocalFileSystemURI(fileUri, function(fileEntry) {
      fileEntry.file(function(fileObj) {
        console.log("文件大小"+fileObj.size);
        if (fileObj.size > 20000000) {
          that.presentAlert("文件大小不能超过20MB, 请重新选择");
        } else {
          that.videoPath = fileUri;
          that.menuObj.videoUrl = that.webview.convertFileSrc(fileUri);
          that.videoChanged = true;
        }
      });
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.menuForm.invalid) {
      return false;
    } else {
      if(
        this.menuObj.menuName != this.menuForm.value.menuName ||
        this.menuObj.intro != this.menuForm.value.intro ||
        this.menuObj.recipe != this.menuForm.value.recipe ||
        this.menuObj.menuTypeId != this.menuForm.value.menuTypeId ||
        this.menuObj.tagId != this.menuForm.value.tagId ||
        this.menuObj.price != this.menuForm.value.price ||
        this.menuObj.sequence != this.menuForm.value.sequence ||
        this.imageChanged == true || this.videoChanged == true
      ) {
        let loader = await this.loadingCtrl.create({
          message: "正在保存",
        });
        loader.present();
        this.menuObj.menuName = this.menuForm.value.menuName;
        this.menuObj.intro = this.menuForm.value.intro;
        this.menuObj.recipe = this.menuForm.value.recipe;
        this.menuObj.menuTypeId = this.menuForm.value.menuTypeId;
        this.menuObj.tagId = this.menuForm.value.tagId;
        this.menuObj.price = this.menuForm.value.price;
        this.menuObj.sequence = this.menuForm.value.sequence;
        this.menuService.saveMenu(this.menuObj).then((data: any) => {
          if (this.imageChanged == true) {
            this.menuService.uploadImage(this.imagePath, data.id).then((data1) => {
              this.imageChanged = false;
              this.dismissView(loader);
            });
          }
          if (this.videoChanged == true) {
            this.menuService.uploadVideo(this.videoPath, data.id).then((data2) => {
              this.videoChanged = false;
              this.dismissView(loader);
            });
          }
          this.dismissView(loader);
        });
      } else {
        this.router.navigate(['/tabs/menu']);
      }
      
    }
  }

  dismissView(loader) {
    if (!this.videoChanged && !this.imageChanged) {
      loader.dismiss();
      this.router.navigate(['/tabs/menu']);
    }
  }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: '请注意',
      message: message,
      buttons: ['OK'],
    });
    alert.present();
  }
}
