import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  url:any="http://localhost:3000/"
  constructor(private http: HttpClient) { }

  getQuestion():Observable<any>{
    return this.http.get<any>(this.url+"get-ques")
  }

  submitFinalAnswer(answer:any):Observable<any>{
    return this.http.post<any>(this.url+"submit-ans",answer)
  }
}
