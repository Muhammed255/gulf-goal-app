import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrendsComponent } from "./trends.component";

import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthGuard } from "src/app/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: TrendsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [TrendsComponent],
})
export class TrendsModule {}
