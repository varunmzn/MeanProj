import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Questions } from '../../model/questions.model';
// import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }



}
