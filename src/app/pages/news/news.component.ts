import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsObject } from 'src/app/models/NewsObject';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  photoCover:string = ""
  newsTitle:string = ""
  newsDescription:string = ""
  private newsLink:string | null = ""
  news?:NewsObject
  
  constructor(private service:NewsService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
      this.newsLink = value.get("id")
    )
    this.service.getNews(4).subscribe(
      {
        next: (res: any) => {
          let resTemp = (res.items.find((element: any) => element.id == this.newsLink));
          let img:string = resTemp.imagens.replace(/\\/g, "").match(/fulltext.+\.jpg/g)[0].slice(10).replace(/\"+/g, "")
          this.photoCover = `https://agenciadenoticias.ibge.gov.br/${img}`
          this.newsDescription = resTemp.introducao
          this.newsTitle = resTemp.titulo
        },
        error: (err: any) => console.log(err)
      }
    )
    console.log(this.news)
  }
}
