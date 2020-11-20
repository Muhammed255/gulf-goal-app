import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsComponent } from "./news.component";
import { RouterModule, Routes } from "@angular/router";
import { SingleNewsComponent } from "./single-news/single-news.component";
import { NewsDetailsComponent } from "./news-details/news-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthGuard } from "../../guards/auth.guard";
import { AddEditNewsComponent } from "./add-edit-news/add-edit-news.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from '@kolkov/angular-editor';

const routes: Routes = [
  {
    path: "",
    component: NewsComponent,
    data: { breadcrumb: "News" },
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: SingleNewsComponent,
        canActivate: [AuthGuard],
        pathMatch: "full",
      },
      {
        path: ":newsId",
        component: NewsDetailsComponent,
        canActivate: [AuthGuard],
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ],
  declarations: [
    NewsComponent,
    SingleNewsComponent,
    NewsDetailsComponent,
    AddEditNewsComponent,
  ],
  entryComponents: [AddEditNewsComponent],
})
export class NewsModule {}
