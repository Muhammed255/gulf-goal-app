import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from "src/environments/environment";

const SERVER_API_URL = environment.apiUrl + "/news/";

@Injectable({
  providedIn: "root",
})
export class NewsService {

  public newsUpdated = new Subject()

  constructor(private http: HttpClient) {}

  addNews(
    title: string,
    content: string,
    teamId: string,
    tag: string,
    image: File
  ) {
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("content", content);
    newsData.append("teamId", teamId);
    newsData.append("tag", tag);
    newsData.append("image", image, title);

    return this.http.post<{ success: boolean; msg: string }>(
      SERVER_API_URL + "create-news",
      newsData
    );
  }

  editNews(
    id: string,
    title: string,
    content: string,
    teamId: string,
    tag: string,
    image: File
  ) {
    let newsData: FormData | any;
    if (typeof image === "object") {
      newsData = new FormData();
      newsData.append("title", title);
      newsData.append("content", content);
      newsData.append("teamId", teamId);
      newsData.append("tag", tag);
      newsData.append("image", image, title);
    } else {
      newsData = {
        _id: id,
        title,
        content,
        teamId,
        tag,
        image,
      };
    }

    return this.http.put<{ success: boolean; msg: string }>(
      SERVER_API_URL + "/" + id,
      newsData
    );
  }

  getAllNews() {
    return this.http.get(SERVER_API_URL + "all-news");
  }

  getNewsSubListener() {
    return this.newsUpdated.asObservable();
  }

  findOneNews(id: string) {
    return this.http.get<{ news: any; filteredNews: any }>(SERVER_API_URL + id);
  }

  deleteNews(id: string) {
    return this.http.delete<{ success: boolean; msg: string }>(
      SERVER_API_URL + "/" + id
    );
  }

  addNewstoTrends(newsId: string) {
    return this.http.post<{ success: boolean; msg: string }>(
      SERVER_API_URL + "trend/" + newsId,
      { newsId }
    );
  }

  getTrends() {
    return this.http.get(SERVER_API_URL + "all-trends");
  }

  removeFromTrends(id: string) {
    return this.http.delete<{success: boolean, msg: string}>(SERVER_API_URL + "trend/" + id);
  }
}
