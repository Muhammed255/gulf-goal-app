import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";

import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginGuard } from "src/app/guards/login.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    pathMatch: "full",
    data: { breadcrumb: "Login" },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
