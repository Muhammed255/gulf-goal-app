import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: "", component: UsersComponent, pathMatch: "full", canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UsersComponent, AddEditUserComponent],
  // entryComponents: [AddEditUserComponent],
})
export class UsersModule {}
