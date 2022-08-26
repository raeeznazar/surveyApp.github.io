import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  signinForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    // it should not be trigger if the form is invalid (if user manually enable using browser developer tool, so this gives extra validation steps)
    if (!this.signinForm.valid) {
      return;
    }

    const username = this.signinForm.value.username;
    const password = this.signinForm.value.password;
    this.isLoading = true;
    // injecting service from authService
    this.authService.signin(username, password).subscribe((resData: any) => {
      console.log(resData);
      this.isLoading = false;

      if (resData.status == 0) {
        this.error = '';
        this.router.navigate(['sidebar/dashboard']);
      } else {
        this.error = resData.message;
        setTimeout(() => {
          this.error = null;
        }, 2000);
      }
    });

    this.signinForm.reset();
  }
}
