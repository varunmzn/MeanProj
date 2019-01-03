import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Users } from '../../model/users.model';  
import { environment } from '../../../environments/environment';
  
@Injectable({  
  providedIn: 'root'  
})  

export class UsersService {  
  
  constructor(private http: HttpClient) { }  
  // baseUrl: string = 'http://localhost:3004/posts/';  
  
  getUsers() {  
    // return this.http.get<Users[]>(this.baseUrl);  
  }  
  // deleteUser(id: number) {  
  //   // return this.http.delete<Users[]>(this.baseUrl + id);  
  // }  
  createUser(users: Users) {  
    // return this.http.post(this.baseUrl, employee);  
    alert("inside services"+environment.apiBaseUrl);
    alert(JSON.stringify(users))
    return this.http.post(environment.apiBaseUrl + '/createuser',users).subscribe((result) => {
    //  console.log(result)
  });
  }  
  // getUserById(id: number) {  
  //   // return this.http.get<Users>(this.baseUrl + '/' + id);  
  // }  
  // updateUser(employee: Users) {  
  //   // return this.http.put(this.baseUrl + '/' + employee.id, employee);  
  // }  
}  