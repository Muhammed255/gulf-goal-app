import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {

  @Input() newsArray: any[]

  constructor(private router: Router, private newsService: NewsService) { }

  ngOnInit() {
  }

  getSingleNews(id) {
    this.router.navigate(["account", "news", id]);
  }



}
