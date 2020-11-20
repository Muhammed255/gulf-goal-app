import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSnackBar, PageEvent } from "@angular/material";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: any[];
  isLoading = false;

  totalUsers = 0;
  usersPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 5, 10, 20];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchUsers(this.usersPerPage, this.currentPage);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.fetchUsers(this.usersPerPage, this.currentPage);
  }

  fetchUsers(usersPerPage, currentPage) {
    this.userService
      .getAllUsers(usersPerPage, currentPage)
      .subscribe((res) => {
        if (res.success) {
          this.isLoading = false;
          this.users = res.users;
          this.totalUsers = res.count;
	        console.log(res.count);
        }
      });
  }

  onDeleteUser(id: string) {
     this.isLoading = true;
    this.userService.deleteUser(id).subscribe((res) => {
      if (res.success) {
	this.isLoading = false;
        this.snackBar.open("deleted", "success", {
          duration: 5000,
        });
        this.fetchUsers(this.usersPerPage, this.currentPage);
      }
    });
  }

  HandleMessage(error, message) {
    this.isLoading = false;
    console.error(error);
    this.snackBar.open(message, "Error", { duration: 5000 });
  }
}
