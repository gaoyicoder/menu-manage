import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

	public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { 

  }
  getTables(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/tables', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteTable(table) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/tables/'+table.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  showCode(table) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/tables/show-code/'+table.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  saveAll(tableList) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/tables/save-all', {'params': tableList}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
