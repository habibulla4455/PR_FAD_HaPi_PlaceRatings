import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  constructor(private data: DataService) { 
    console.log('App Component Constructor called');
    firebase.initializeApp( environment.firebase );



    firebase.auth().onAuthStateChanged( (user) => {
      if (user) { // user is signed in.
        this.data.changeCurrentUser(user);
      } 
    });
/*
    var user = firebase.auth().currentUser;
  if (user) { 
/*
    this.data.changedisplayName( user.displayName );
*
    this.data.changeCurrentUser(user);
  } */
  }
  title = 'ratingApp';
}


