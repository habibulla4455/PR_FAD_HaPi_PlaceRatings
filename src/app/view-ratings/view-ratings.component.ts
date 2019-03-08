import { Component, OnInit } from '@angular/core';
import { TileMutexService } from "../tile-mutex.service";
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-ratings',
  templateUrl: './view-ratings.component.html',
  styleUrls: ['./view-ratings.component.css']
})
export class ViewRatingsComponent implements OnInit {

  loggedIn:boolean;

  places: object[];
  placeIDs:string[];
  firestore;

  constructor(private tileMutex: TileMutexService) {
    this.tileMutex.letOthersKnow( {'value':false, 'index':-1} );
    this.places = [];
    this.placeIDs =  [];
    
    firebase.firestore().collection("reviews")
    .get()
    .then( (querySnapshot) => {
      querySnapshot.forEach( (doc) => {
        this.places.push( doc.data() );
        this.placeIDs.push( this.places[ this.places.length-1 ]['placeId'] );
        }
      );
      //remove duplicates from places here
      this.placeIDs = this.placeIDs.filter((el, i, a) => i === a.indexOf(el)); 
      }
    );
    


    var user = firebase.auth().currentUser;
    
    if (user) {
      // User is signed in.
      this.loggedIn = true;
      
    } else {
      // No user is signed in.
      this.loggedIn = false;
    }


   }

  ngOnInit() {
  }

}
