import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList, MatSnackBar } from '@angular/material';
import { TagService } from "src/app/services/tag.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  public tagList: Array<any>;
  public newTagText: string = "";
  btnIsActive = false;
  form: FormGroup;

  @ViewChild('tagOption', {static: false}) tagOption: MatListOption

  constructor(private tagService: TagService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initForm();
    this.fetchTagsList();
  }

  fetchTagsList() {
    this.tagService.getAllTags().subscribe((res) => {
      if (res.success) {
        this.tagList = res.tags;
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      tag: new FormControl(null, Validators.required)
    })
  }

  onDeleteTag(id) {
    this.tagService.deleteTag(id).subscribe(res => {
      if(res.success) {
        this.fetchTagsList();
        this.snackBar.open("Tag Deleted", "success", {duration: 5000})
      }
    })
  }

  onChange(id, event) {
    console.log(event);
    this.tagService.findOneTag(id).subscribe(res => {
      this.form.patchValue(res.tag)
    })
  }

  onUpdateTag(id) {
    
    // this.newTagText = event.target.value
    this.tagService.updateTag(id, this.form.value.tag).subscribe(res => {
      const index = this.tagList.findIndex(t => t._id === id);
      this.tagList[index] = this.tagList;
    })
  }

  public onAddTag(event: any) {
    if (
      (event.which === 1 || event.which === 13) &&
      this.newTagText.trim() != ""
    ) {
      this.tagService.addNewTag(this.form.value.tag).subscribe((res) => {
        if (res.success) {
          this.tagList.push(res.tag)
          this.newTagText = "";
        }
      });
    }
  }
}
