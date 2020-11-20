import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { mimeType } from "src/app/helper/mime-type.validator";
import { NewsService } from "src/app/services/news.service";
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: "app-add-edit-news",
  templateUrl: "./add-edit-news.component.html",
  styleUrls: ["./add-edit-news.component.scss"],
})
export class AddEditNewsComponent implements OnInit {
  newsForm: FormGroup;
  imagePreview: string;
  editableNewsId: string;
  headerTitle = "New News";
  tags: any[];

  constructor(
    public dialogRef: MatDialogRef<AddEditNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private newsService: NewsService,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.editableNewsId = this.data.newsId;
    this.initForm();
    this.data = {
      title: this.newsForm.controls.title,
      content: this.newsForm.controls.content,
      tag: this.newsForm.controls.tag,
      teamId: this.newsForm.controls.teamId,
      image: this.newsForm.controls.image,
    };

    if (this.editableNewsId) {
      this.setNewsToForm(this.editableNewsId);
      this.headerTitle = "Edit News";
    }

    this.getTags();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTags() {
    this.tagService.getAllTags().subscribe(res => {
      if(res.success) {
        this.tags = res.tags;
      }
    })
  }

  private initForm() {
    this.newsForm = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      teamId: ["", Validators.required],
      tag: ["", Validators.required, mimeType.bind(this)],
      image: ["", Validators.required]
    });
  }

  setNewsToForm(id: string) {
    this.newsService.findOneNews(id).subscribe((response) => {
      this.newsForm.patchValue(response.news);
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
        return object1 && object2 && object1.id == object2.id;
    }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newsForm.patchValue({ image: file });
    this.newsForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
