import { Component, OnInit } from "@angular/core";
import { filter } from "rxjs/operators";
import { MatDialog, MatSnackBar } from "@angular/material";

import { NewsService } from "src/app/services/news.service";
import { UserService } from "src/app/services/user.service";
import { AddEditNewsComponent } from "./add-edit-news/add-edit-news.component";


@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  fetchedNews: any;
  authUser: any;
  isLoading = false;

  constructor(
    private newsService: NewsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchNews();
    this.userService
      .findOneUser(localStorage.getItem("userId"))
      .subscribe((res) => {
        if (res.success) {
          this.authUser = res.user;
        }
      });
  }

  fetchNews() {
    this.newsService.getAllNews().subscribe((res) => {
      this.fetchedNews = res;
      this.newsService.newsUpdated.next();
      this.isLoading = false;
    });
  }

  openDialog(id?: string) {
    const options = {
      width: "670px",
      height: "560px",
      data: {},
    };
    if (id) {
      options.data = { newsId: id };
    }

    let dialogRef = this.dialog.open(AddEditNewsComponent, options);
    dialogRef
      .afterClosed()
      .pipe(filter((res) => typeof res === "object"))
      .subscribe((result) => {
        this.isLoading = true;
        if (id) {
          this.newsService.editNews(
            id,
            result.title,
            result.content,
            result.teamId,
            result.tag,
            result.image
          ).subscribe(res => {
            if(res.success) {
              this.isLoading = false;
              this.snackBar.open(res.msg, "success", { duration: 5000 });
              const index = this.fetchedNews.findIndex(n => n._id === id);
              this.fetchedNews = this.fetchedNews[index];
            }
          })
        } else {
          this.newsService
            .addNews(
              result.title,
              result.content,
              result.teamId,
              result.tag,
              result.image
            )
            .subscribe((response) => {
              if (response.success) {
                this.isLoading = false;
                this.snackBar.open(response.msg, "success", { duration: 5000 });
                this.fetchedNews.push(result);
              }
            });
        }
      });
  }

  onDelete(id) {
    this.isLoading = true;
    this.newsService.deleteNews(id).subscribe(res => {
      if(res.success) {
        this.isLoading = false;
        this.snackBar.open(res.msg, "success", { duration: 5000 });
      }
    })
  }

  onAddNewsToTrends(id: string) {
    const found = this.authUser.trends_news.some((news: string) => news === id);
    if (!found) {
      this.newsService.addNewstoTrends(id).subscribe((data) => {
        if (data.success) {
          this.authUser.trends_news.push(id);
          this.snackBar.open(data.msg, "success", { duration: 5000 });
        }
      });
    }
  }
}
