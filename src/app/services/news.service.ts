import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsObject } from '../models/NewsObject';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url:string = ""
  private news:NewsObject | any = ""

  constructor(private http:HttpClient) {
    this.url = environment.ibgeNews
  }

  getNews(qtd:number):Observable<NewsObject> {
    this.news = this.http.get<NewsObject>(`${this.url}&qtd=${qtd}`)
    return this.news
  }
}
