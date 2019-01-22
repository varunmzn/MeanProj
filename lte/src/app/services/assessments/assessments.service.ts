import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assessments } from '../../model/assessments.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

  selectedAssessment: Assessments = {
    assessmentname: ''
  };

  constructor(private http: HttpClient) { }

  createAssessment(assessments: Assessments): Observable<any> {
    alert("hello")
    return this.http.post(environment.apiBaseUrl + '/createAssessment', assessments)
  }

  listAssessments(id: number = null): Observable<any> {
    if (id) {
      return this.http.post(environment.apiBaseUrl + '/getAssessmentById', { id: id });
    } else {
      return this.http.get(environment.apiBaseUrl + '/getAssessment');
    }
  }

  delAssessment(id: Number) : Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/deleteAssessment/' + id)
  }

}
