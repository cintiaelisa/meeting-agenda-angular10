import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  MOBILE_BAAS_URL: string = 'https://mobilebaas.com/backend/api/manage/db';
  tableName: string = 'meeting';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'MOBILEBAASKEY' : 'MTYyMTAxNDgwMTE1NENpbnRpYSBFbGlzYQ=='
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  insert(meeting: any) {
    return this.http.post(this.MOBILE_BAAS_URL+'?table'+this.tableName,meeting,this.httpOptions);
  }

  update(meeting: any) {
    return this.http.put(this.MOBILE_BAAS_URL+'?table'+this.tableName,meeting,this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.MOBILE_BAAS_URL+'/'+id+'?table='+this.tableName,this.httpOptions);
  }

  getById(id: string) {
    return this.http.get(this.MOBILE_BAAS_URL+'/'+id+'?table='+this.tableName,this.httpOptions);
  }

  getAll(){
    
  }

}
