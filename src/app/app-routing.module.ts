import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "account",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "news",
        loadChildren: () =>
          import("./pages/news/news.module").then((m) => m.NewsModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "trends",
        loadChildren: () =>
          import("./pages/trends/trends.module").then((m) => m.TrendsModule),
      },
    ],
  },
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./pages/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "signup",
        loadChildren: () =>
          import("./pages/signup/signup.module").then((m) => m.SignupModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
