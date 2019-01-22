import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from '../../model/questions.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  selectedQuestion = {
    questionName: '',
   subjectId: 0
  };

  constructor(private http: HttpClient) { }

   createQuestion(questions: Questions): Observable<any> {
    alert("hello")
    return this.http.post(environment.apiBaseUrl + '/createQuestion', questions)
  }

  listQuestions(id: number = null): Observable<any> {
    if (id) {
      return this.http.post(environment.apiBaseUrl + '/getQuestionById', { id: id });
    } else {
      return this.http.get(environment.apiBaseUrl + '/getQuestion');
    }
  }

  delQuestion(id: Number) : Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/deleteQuestion/' + id)
  }
}
