import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginGuard } from "src/app/guards/login.guard";

const routes: Routes = [
  {
    path: "",
    component: SignupComponent,
    pathMatch: "full",
    data: { breadcrumb: "Sign Up" },
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
  declarations: [SignupComponent],
})
export class SignupModule {}
