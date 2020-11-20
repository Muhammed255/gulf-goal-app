import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  public form:FormGroup;
  isLoading = false;
  constructor(public fb: FormBuilder, public router:Router, private authService: UserService){
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': false
    });
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }
    
    this.authService.login(this.form.value.email, this.form.value.password);
  }

  ngOnInit() {}

}
