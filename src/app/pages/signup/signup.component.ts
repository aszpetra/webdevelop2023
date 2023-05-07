import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  })

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router,) { }

  ngOnInit(): void {
  }

  onSubmit(){
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value,
          username: this.signUpForm.get('email')?.value.split('@')[0],
          name: {
            firstname: this.signUpForm.get('name.firstName')?.value,
            lastname: this.signUpForm.get('name.lastName')?.value,
          }
        };
        this.userService.create(user).then(_ => {
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
  }

  getEmailErrorMessage() {
    if (this.signUpForm.get('email')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    return this.signUpForm.get('email')?.hasError('email') ? 'Nem megfelelő e-mail cím' : '';
  }

  getPasswordErrorMessage() {
    if (this.signUpForm.get('password')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    return this.signUpForm.get('password')?.hasError('minLength') ? 'Legalább 6 karaktert adjon meg' : '';
  }

  getRePasswordErrorMessage() {
    if (this.signUpForm.get('rePassword')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    if(this.signUpForm.get('rePassword') !== this.signUpForm.get('password')){
      return 'Nem egyezik a két jelszó'
    }
    return this.signUpForm.get('rePassword')?.hasError('minLength') ? 'Legalább 6 karaktert adjon meg' : '';
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

}
