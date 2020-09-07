import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  userEmail: string;
  userPassword: string;
  userEmailsignup: string;
  userPasswordsignup: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  isValid: boolean = false;
  email: string;
  password: string;


  constructor(private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });

  public signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log(this.router.url);


  }

  signUp() {
    const signupForm = document.querySelector('#signup-form');
    signupForm.querySelector('.alert').innerHTML = '';

    this.auth.signUp(this.userEmailsignup, this.userPasswordsignup);
    this.afAuth.auth.createUserWithEmailAndPassword(this.userEmailsignup, this.userPasswordsignup)
    .catch(err =>{
      signupForm.querySelector('.alert').innerHTML = err.message;

    })
  }

  login(email, password) {
    const loginForm = document.querySelector('#login-form');
    this.auth.login(this.userEmail, this.userPassword);

    loginForm.querySelector('.alert').innerHTML = '';

    this.afAuth.auth.signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .catch(function (error) {
        // Handle Errors here.

        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          // alert('Wrong password.');
          loginForm.querySelector('.alert').innerHTML = '*Упс, пароль невірний ';
        } else {
          // alert(errorMessage);
          loginForm.querySelector('.alert').innerHTML = errorMessage;
        }
        console.log('error', error.code);

      });

 


  }

}
