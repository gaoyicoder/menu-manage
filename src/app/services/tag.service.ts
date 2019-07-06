import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

	public serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) {
  	
  }

  getTags(params) {
    return new Promise(resolve=>{
      this.http.get(this.serverUrl+'/tags', {params}).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  deleteTag(tag) {
    return new Promise(resolve=>{
      this.http.delete(this.serverUrl+'/tags/'+tag.id).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  
  saveTag(tag) {
    if (tag.id == '') {
      return this.createTag(tag);
    } else {
      return this.updateTag(tag);
    }
  }

  createTag(tag) {
    return new Promise(resolve=>{
      this.http.post(this.serverUrl+'/tags', tag).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }

  updateTag(tag) {
    return new Promise(resolve=>{
      this.http.put(this.serverUrl+'/tags/'+tag.id, tag).subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
