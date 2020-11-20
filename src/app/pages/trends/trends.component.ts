import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  isLoading = false;
  trends: any;
  userIsAuthenticated = false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getTrends();
  }

  getTrends() {
    this.newsService.getTrends().subscribe(res => {
      this.isLoading = false;
      this.trends = res;
    })
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.newsService.removeFromTrends(id).subscribe(res => {
      if(res.success) {
        this.isLoading = false;
        this.getTrends();
      }
    })
  }

}
