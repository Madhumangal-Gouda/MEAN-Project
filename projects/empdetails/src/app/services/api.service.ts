import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { IEmployee } from '../contract/IEmployee';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor( private http : HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/Employee/",data)

  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/Employee")
  }
  putEmployee(data:any, _id:number){
    return this.http.put<any>("http://localhost:3000/Employee/"+ `${_id}`,data)
  }
  deleteEmployee( _id: number){
    return this.http.delete<any>("http://localhost:3000/Employee/"+_id)
  }
}
