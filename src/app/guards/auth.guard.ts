import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from "@angular/router";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs";
import { UserService } from '../services/user.service';
  
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.userService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/login'], {queryParams: {'redirectUrl': state.url}});
      }
      return isAuth;
    }
  }