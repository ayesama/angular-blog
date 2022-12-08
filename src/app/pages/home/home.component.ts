import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsObject } from 'src/app/models/NewsObject';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsArray:NewsObject[] = []
  newsData:Observable<NewsObject> | any = ""
  
  constructor(private service:NewsService) {}

  ngOnInit() {
    this.newsData = this.service.getNews(4).subscribe(
      {
        next: (res: any) => {
          res.items.forEach((element: any) => {
            let img:string = element.imagens.replace(/\\/g, "").match(/fulltext.+\.jpg/g)[0].slice(10).replace(/\"+/g, "")
            this.newsArray.push({
              id: `${element.id}`,
              title: element.titulo,
              imagem: `https://agenciadenoticias.ibge.gov.br/${img}`,
              description: element.introducao
            })
          });
        },
        error: (err: any) => console.log(err)
      }
    );  
  }
}
