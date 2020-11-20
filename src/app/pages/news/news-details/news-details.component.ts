import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { AddEditNewsComponent } from '../add-edit-news/add-edit-news.component';

@Component({
  selector: 'app-news-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  news: any;
  newsToUpdate: any;

  constructor(private newsService: NewsService, private route: ActivatedRoute, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(!paramMap.has("newsId")) {
        return;
      }
      this.newsService.findOneNews(paramMap.get("newsId")).subscribe(response => {
        this.news = response.news;
        console.log(this.news)
      })
    })
    this.newsService.getAllNews().subscribe(res => {
      this.newsToUpdate = res;
    })
  }

  openDialog(id) {
    const options = {
      width: '670px',
      height: '560px',
      data: {}
    };
    if(id) {
      options.data = {newsId: id}
    }

    let dialogRef = this.dialog.open(AddEditNewsComponent, options);
    dialogRef.afterClosed().subscribe(result => {
      this.newsService.editNews(id, result.title, result.content, result.teamId, result.tag, result.image).subscribe(response => {
        if(response.success) {
          this.snackBar.open("News Updated", "success", {duration: 5000});
          const index = this.newsToUpdate.findIndex(n => n._id === id);
          this.newsToUpdate[index] = this.newsToUpdate
        }
      })
    })
  }

  onDelete(id) {
    this.newsService.deleteNews(id).subscribe(res => {
      if(res.success) {
        this.snackBar.open("News Deleted", "success", {duration: 5000});
        const index = this.newsToUpdate.findIndex(n => n._id === id);
        this.newsToUpdate.slice(index, 1);
      }
    })
  }

}
