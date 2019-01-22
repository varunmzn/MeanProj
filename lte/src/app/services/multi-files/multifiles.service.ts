import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Assessments } from '../../model/assessments.model';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultifilesService {

  constructor(private http: HttpClient) { }

  saveFiles(total_form): Observable<any> {

    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "none" })
    // }
    
    // console.log("total_form")
    // console.log(total_form)
    return this.http.post(environment.apiBaseUrl + "/uploadFiles", total_form);

  }

}