import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-code',
  templateUrl: './table-code.page.html',
  styleUrls: ['./table-code.page.scss'],
})
export class TableCodePage implements OnInit {

	public tableName;
	public codeUrl;
  constructor(
  	private route: ActivatedRoute,
  	private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.route.pathFromRoot[0].snapshot.queryParams) {
      this.tableName = this.route.pathFromRoot[0].snapshot.queryParams.tableName;
      this.codeUrl = this.route.pathFromRoot[0].snapshot.queryParams.codeUrl;
    }
  }

}
