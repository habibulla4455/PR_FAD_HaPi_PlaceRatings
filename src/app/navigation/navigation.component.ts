import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import * as firebase from 'firebase/app';
import { DataService } from "../data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  isChecked:boolean;
  displayName:string;
  user;

  constructor(private data: DataService, private router: Router) { 
    this.isChecked=false;

    this.data.currentuser.subscribe( 
      (user) => {
        this.user = user;
        this.displayName = user['displayName'];
      } 
    );

  }

  ngOnInit() {
  }

  signOut(){
    firebase.auth().signOut().then(() => {
      this.displayName = undefined;
      this.router.navigate(['/']); 
    }).catch(function(error) {
    });
  }

  clicked(){
    this.isChecked=false;
  }
}
