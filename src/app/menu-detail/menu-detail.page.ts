import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuTypeService } from '../services/menu-type.service';
import { MenuService } from '../services/menu.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {

	public menuForm: FormGroup;
  public submitted = false;
  public menuTypeList;
  private imageResponse: any;

  private imageChanged;

  private imagePath = '';

	public menuObj = {
    id:'',
    imageUrl:'/assets/images/placeholder.jpg',
    menuName:'',
    menuTypeId:'',
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
    private router: Router,
  ) {
  	this.menuForm = this.formBuilder.group({
  		menuName: ['', Validators.required],
  		menuTypeId: ['', Validators.required],
  		price: ['', Validators.required],
      sequence: [0, Validators.required],
  	});
  }

  ionViewWillEnter() {
    
  }
  ionViewDidEnter() {
    this.submitted = false;
    this.imageChanged = false;
    this.imagePath = '';

    if(this.route.pathFromRoot[0].snapshot.queryParams.menu!=="") {
      this.menuObj = JSON.parse(this.route.pathFromRoot[0].snapshot.queryParams.menu);
    } else {
      this.menuObj = {
        id:'',
        imageUrl:'/assets/images/placeholder.jpg',
        menuName:'',
        menuTypeId:'',
        price:'',
        sequence: 0
      };
    }

    this.menuForm.controls['menuName'].setValue(this.menuObj.menuName);
    this.menuForm.controls['price'].setValue(this.menuObj.price);
    this.menuForm.controls['menuTypeId'].setValue(this.menuObj.menuTypeId.toString());
    this.menuForm.controls['sequence'].setValue(this.menuObj.sequence);
    this.menuTypeService.getMenuTypes({'sort': 'id'}).then(data => {
      this.menuTypeList = data;
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

  async onSubmit() {
    this.submitted = true;
    if (this.menuForm.invalid) {
      return false;
    } else {
      if(
        this.menuObj.menuName != this.menuForm.value.menuName ||
        this.menuObj.menuTypeId != this.menuForm.value.menuTypeId ||
        this.menuObj.price != this.menuForm.value.price ||
        this.menuObj.sequence != this.menuForm.value.sequence ||
        this.imageChanged == true
      ) {
        let loader = await this.loadingCtrl.create({
          message: "正在保存",
        });
        loader.present();
        this.menuObj.menuName = this.menuForm.value.menuName;
        this.menuObj.menuTypeId = this.menuForm.value.menuTypeId;
        this.menuObj.price = this.menuForm.value.price;
        this.menuObj.sequence = this.menuForm.value.sequence;
        this.menuService.saveMenu(this.menuObj).then((data: any) => {
          if (this.imageChanged == true) {
            this.menuService.uploadImage(this.imagePath, data.id).then((data) => {
              loader.dismiss();
              this.router.navigate(['/tabs/menu']);
            });
          } else {
            loader.dismiss();
            this.router.navigate(['/tabs/menu']);
          }
        });
      } else {
        this.router.navigate(['/tabs/menu']);
      }
      
    }
  }
}
