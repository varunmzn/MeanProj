import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subjects } from '../../model/subjects.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  selectedSubject: Subjects = {
    subjectname: ''
  };

  constructor(private http: HttpClient) { }
  createSubject(subjects: Subjects): Observable<any> {
    alert("hello")
    return this.http.post(environment.apiBaseUrl + '/createSubject', subjects)
  }

  listSubjects(id: number = null): Observable<any> {
    if (id) {
      return this.http.post(environment.apiBaseUrl + '/getSubjectById', { id: id });
    } else {
      return this.http.get(environment.apiBaseUrl + '/getSubject');
    }
  }

  delSubject(id: Number) : Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/deleteSubject/' + id)
  }
}
