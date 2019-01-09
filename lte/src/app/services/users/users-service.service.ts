import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../model/users.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
  createUser(users: Users): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/createuser', users)
  }

  listUsers(id: number = null): Observable<any> {
    if (id) {
      return this.http.post(environment.apiBaseUrl + '/getUserById', { id: id });
    } else {
      return this.http.get(environment.apiBaseUrl + '/getUser');
    }
  }

  delUser(id: Number) : Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/deleteUser/' + id)
  }


  // getUserById(id: number) {  
  //   // return this.http.get<Users>(this.baseUrl + '/' + id);  
  // }  
  // updateUser(employee: Users) {  
  //   // return this.http.put(this.baseUrl + '/' + employee.id, employee);  
  // }  
}  