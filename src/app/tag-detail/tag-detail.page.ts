import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.page.html',
  styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
	public tagObj = {
    id:'',
    tagName:'',
    tagOther: {
      groupName: "",
      groupType: ""
    },
    tagGroup: [
    	{
    		groupName: "",
    		groupType: ""
    	},
    ],
  };

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private toastCtrl: ToastController,
  	private tagService: TagService,
  ) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
  	if(this.route.pathFromRoot[0].snapshot.queryParams.tag!=="") {
      let tempObj = JSON.parse(this.route.pathFromRoot[0].snapshot.queryParams.tag);

      let tempOther = {
        groupName: "",
        groupType: "",
      };
      tempOther.groupName = tempObj.other.name;
      tempOther.groupType = "";
      tempObj.other.type.forEach((data) => {
        if ( tempOther.groupType == "") {
          tempOther.groupType = data;
        } else {
          tempOther.groupType = tempOther.groupType + " " + data;
        }
      });

      let tempGroup = [];
      tempObj.group.forEach((groupData) => {
        let tempRowGroup = {
          groupName: "",
          groupType: "",
        };
        tempRowGroup.groupName = groupData.name;
        tempRowGroup.groupType = "";
        groupData.type.forEach((data) => {
          if ( tempRowGroup.groupType == "") {
            tempRowGroup.groupType = data;
          } else {
            tempRowGroup.groupType = tempRowGroup.groupType + " " + data;
          }
        });
        tempGroup.push(tempRowGroup);
      });

      this.tagObj = {
        id: tempObj.id,
        tagName: tempObj.name,
        tagOther: tempOther,
        tagGroup: tempGroup,
      };
    } else {
    	this.tagObj = {
        id:'',
        tagName:'',
        tagOther: {
          groupName: "",
          groupType: ""
        },
        tagGroup: [
        	{
        		groupName: "",
        		groupType: ""
        	},
        ],
      };
    }
  }
  ionViewDidEnter() {
  }

  addTagGroup() {
    this.tagObj.tagGroup.push({groupName: "", groupType: ""});
  }

  save() {
  	let isValid = true;
  	if (this.tagObj.tagName == "") {
  		this.presentToast("保存失败，类型名称或类型顺序不能为空");
      isValid = false;
  	}
  	if (isValid) {
  		this.tagService.saveTag(this.tagObj);
  		this.router.navigate(['/tabs/menu/tag']);
  	}
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
