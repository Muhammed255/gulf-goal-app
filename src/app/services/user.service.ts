import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

const SERVER_API_URL = `${environment.apiUrl}/users/`;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;
  private role: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthRole() {
    return this.role;
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    const headers = new HttpHeaders();
    //headers.set("Content-Type", "application/json");
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "http://gulf-goal.herokuapp.com");
    headers.append('Access-Control-Allow-Credentials', 'true');
    this.http
      .post<{
        success: boolean;
        userId: any;
        token: string;
        expiresIn: number;
      }>(SERVER_API_URL + "admin-login", authData)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        console.log(this.role);
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/account/dashboard"]);
        }
      });
  }

  signup(
    username: string,
    email: string,
    password: string,
    preferredLanguage: string
  ) {
    const authData = {
      email: email,
      username: username,
      password: password,
      preferredLanguage: preferredLanguage,
    };
    return this.http.post(SERVER_API_URL + "admin-signup", authData);
  }

  editProfile(
    name: string,
    email: string,
    username: string,
    password: string,
    user_image: File | string,
    bio: string,
    job_concern: boolean,
    postalCode: string,
    phone_number: string
  ) {
    let userData: FormData | any;
    if (typeof user_image === "object") {
      userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("username", username);
      userData.append("password", password);
      userData.append("user_image", user_image, name);
      userData.append("bio", bio);
      userData.append("job_concern", job_concern.toString());
      userData.append("postalCode", postalCode);
      userData.append("phone_number", phone_number);
    } else {
      userData = {
        name: name,
        email: email,
        username: username,
        password: password,
        user_image: user_image,
        phone_number: phone_number,
        job_concern: job_concern,
        postalCode: postalCode,
      };
    }
    return this.http.put(`${SERVER_API_URL}/edit_profile`, userData);
  }

  findOneUser(id: string) {
    return this.http.get<{ success: boolean; user: any }>(SERVER_API_URL + id);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/home"]);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  getAllUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{ success: boolean; users: any[], count: number }>(
      SERVER_API_URL + "all-users" + queryParams
    );
  }


  getAllUsersForCount() {
    return this.http.get<{ success: boolean; users: any[], count: number }>(
      SERVER_API_URL + "all-users"
    );
  }

  deleteUser(id: string) {
    return this.http.delete<{ success: boolean; msg: string }>(
      SERVER_API_URL + id
    );
  }

  /* confirm_email(token: string) {
        const tokenData = {token: token};
        return this.http.post<{msg: string}>(`${SERVER_API_URL}/confirmation`, tokenData);
    }

    resend_confirmation(email: string) {
        const emailData = {email: email};
        return this.http.post<{msg: string, result: any}>(`${SERVER_API_URL}/resend_confirmation`, emailData);
    } */
}
