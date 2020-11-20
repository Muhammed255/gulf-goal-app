import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BreadcrumbComponent } from "./shared/breadcrumb/breadcrumb.component";
import { ContentHeaderComponent } from "./shared/content-header/content-header.component";
import { SharedModule } from "./shared/shared.module";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { SidenavComponent } from "./theme/components/sidenav/sidenav.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { MenuService } from "./services/menu.service";
import { UserService } from "./services/user.service";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { LoginGuard } from "./guards/login.guard";
import { NewsService } from "./services/news.service";
import { AngularEditorService } from "@kolkov/angular-editor";

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    DashboardLayoutComponent,
    NotFoundComponent,
    VerticalMenuComponent,
    SidenavComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MenuService,
    UserService,
    NewsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    LoginGuard,
    AngularEditorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
