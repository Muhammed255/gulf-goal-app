import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  newsCount = 0;
  usersCount = 0;

  constructor(private newsService: NewsService, private userService: UserService) { }

  ngOnInit() {
    this.newsService.getAllNews().subscribe((res: any[]) => {
      this.newsCount = res.length;
    })

    this.userService.getAllUsersForCount().subscribe(res => {
      this.usersCount = res.count;
    })
  }

}
