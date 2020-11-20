import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  public form:FormGroup;
  isLoading = false;

  languages = [
    {value: "English"},
    {value: "French"},
    {value: "Espanol"},
    {value: "Indonis"}
  ]

  constructor(private authService: UserService, public fb: FormBuilder, public router:Router){
    this.form = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'preferredLanguage': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.signup(
      this.form.value.username,
      this.form.value.email,
      this.form.value.password,
      this.form.value.preferredLanguage,
  ).subscribe(response => {
      console.log(response);
      this.isLoading = true;
      this.router.navigate(['/login']);
  }, err => console.log(err))
  }

  ngOnInit() {
  }

}
