import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dataFake } from '../../data/dataFake'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input()
  photoCover:string = ""
  @Input()
  newsTitle:string = ""
  @Input()
  newsDescription:string = ""
  private newsLink:string | null = ""

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
      this.newsLink = value.get("id")
    )

    this.setValuesToComponent(this.newsLink)
  }

  setValuesToComponent(id:string | null) {
    const result = dataFake.filter(news => news.id == id)[0]
      this.newsDescription = result.description
      this.newsTitle = result.title
      this.photoCover = result.photo
  }
}
