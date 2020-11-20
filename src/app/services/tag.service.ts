import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const SERVER_API_URL = environment.apiUrl + "/tags/";

@Injectable({
  providedIn: "root",
})
export class TagService {
  constructor(private http: HttpClient) {}

  getAllTags() {
    return this.http.get<{ success: boolean; msg: string; tags: any[] }>(
      SERVER_API_URL + "all-tags"
    );
  }

  addNewTag(tag: string) {
    return this.http.post<{ success: boolean; msg: string; tag: any }>(
      SERVER_API_URL + "add-tag",
      { tag: tag }
    );
  }

  findOneTag(id) {
    return this.http.get<{ success: boolean; msg: string; tag: any }>(
      SERVER_API_URL + id
    );
  }

  updateTag(id: string, tag: string) {
    return this.http.put<{ success: boolean; msg: string }>(
      SERVER_API_URL + id,
      { tag: tag }
    );
  }

  deleteTag(id: string) {
    return this.http.delete<{ success: boolean; msg: string }>(
      SERVER_API_URL + id
    );
  }
}
