import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AuthGuard } from "src/app/guards/auth.guard";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TilesComponent } from "./tiles/tiles.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
    data: { breadcrumd: "Dashboard" },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  declarations: [DashboardComponent, TilesComponent, TodoComponent],
})
export class DashboardModule {}
