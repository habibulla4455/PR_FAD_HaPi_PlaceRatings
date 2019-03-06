import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import { DataService } from "../data.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  showEmailError:boolean;
  emailErrorMessage:string;

  showPasswordError:boolean;
  passwordErrorMessage:string;

  constructor(  private router: Router,private data: DataService ) { 
    this.showEmailError = false;
    this.showPasswordError = false;
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  ngOnInit() {
  }

  credentialHandler(obj:any){

    this.showEmailError = false;
    this.emailErrorMessage = '';

    this.showPasswordError = false;
    this.passwordErrorMessage = '';

    if ( obj.username === undefined || obj.username.length < 1  ) {
      this.showEmailError = true;
      this.emailErrorMessage = 'Email Address can not be blank.';
    }
    if ( obj.password === undefined || obj.password.length < 1  ) {
      this.showPasswordError = true;
      this.passwordErrorMessage = 'Password can not be blank.';
    }
  
    firebase.auth().signInWithEmailAndPassword(obj.username, obj.password)
      
      .then( () => {  
        var user = firebase.auth().currentUser;
                      if (user) { 
/*
                        this.data.changedisplayName( user.displayName );
                        */
                       this.data.changeCurrentUser(user);
                        this.router.navigate(['/viewRatings']); 
                      } 
                    }
      )
      .catch( (error) => {

        if (  error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' ){
          this.showEmailError = true;
          this.emailErrorMessage = 'The email you’ve entered isn\'t registered.';
        } 

        if (  error.code === 'auth/wrong-password' ){
          this.showPasswordError = true;
          this.passwordErrorMessage = 'The password is incorrect';
        } 
    });

   
    
    
    

  }


}
