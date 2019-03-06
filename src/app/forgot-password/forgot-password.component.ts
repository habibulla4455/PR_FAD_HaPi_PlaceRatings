import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  username:string;
  emailErrorMessage:string;
  showEmailError:boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickHandler(){
    this.emailErrorMessage = '';
    this.showEmailError = false;

    if ( this.username === undefined || this.username.length < 1 ) {
      this.showEmailError = true;
      this.emailErrorMessage = 'Email Address can not be blank.';
    }

    var isValid = firebase.auth().fetchSignInMethodsForEmail(this.username);

    firebase.auth().sendPasswordResetEmail(this.username)
      .then( () => {
        // Password reset email sent.
        this.router.navigate(['/signIn']); 
      })
      .catch((error) => {
        // Error occurred. Inspect error.code.  auth/invalid-email
        
        if(error.code === 'auth/invalid-email') this.emailErrorMessage = 'Not a valid email address.';
        if(error.code === 'auth/user-not-found') this.emailErrorMessage = 'The email you’ve entered isn\'t registered.';
        this.showEmailError = true;
        
      });

  }

}
