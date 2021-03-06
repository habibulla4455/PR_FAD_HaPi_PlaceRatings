import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

import { DataService } from "../data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showEmailError:boolean;
  emailErrorMessage:string;

  showPasswordError:boolean;
  passwordErrorMessage:string;
  
  constructor( private router: Router, private data: DataService  ) {
    this.showEmailError = false;
    this.showPasswordError = false;
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
   }

  ngOnInit() {
  } 

  credentialHandler(obj:any){

    this.showEmailError = false;
    this.showPasswordError = false;
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';

    if ( obj.username === undefined || obj.username.length < 1  ) {
      this.showEmailError = true;
      this.emailErrorMessage = "C'mon, Morty. Ya gotta .. ya ..ya gotta enter an email address, Morty. ";
    }
    if ( obj.password === undefined || obj.password.length < 1  ) {
      this.showPasswordError = true;
      this.passwordErrorMessage = 'Ah Jeez, Rick! We .. We need a Password over here, Rick!';
    }

  
    firebase.auth().createUserWithEmailAndPassword(obj.username, obj.password)

      .then( () => {  
        var user = firebase.auth().currentUser;
                      if (user) { 
                        //put display name here.
                        var name   = obj.username.substring(0, obj.username.lastIndexOf("@"));

                        user.updateProfile({

                          //string parse to segment username from email address
                          //assign that to displayName

                          displayName: name,
                          photoURL: ""
                          
                        }).then(() => {
                          /*
                          this.data.changedisplayName( user.displayName );
                          */

                          this.data.changeCurrentUser(user);

                          this.router.navigate(['/viewRatings']); 
                        }).catch( (error) => {
                        //  console.log('the error was: ');
                         // console.log(error.code);
                        //  console.log(error.message);


                        });
                        //this.router.navigate(['/viewRatings']); 
                      } 
                    }
      )     
      .catch((error) => {

      //  console.log('the error was: ');
      //  console.log(error.code);
      //  console.log(error.message);

        if(error.code === 'auth/invalid-email') {
          this.showEmailError = true;
          this.emailErrorMessage = "I'm Mister MeSeeks, Look at me! That's not a valid email address, Jerry!";
        }
        
        if(error.code === 'auth/weak-password') {
          this.showPasswordError = true;
          this.passwordErrorMessage = "Ya have to, ya have to use at least, at least 6 characters, Jerry!";
        }



      });



  }

  


  

}
