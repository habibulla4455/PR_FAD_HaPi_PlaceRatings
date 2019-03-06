import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  @Input() placeId:string;
  reviews: object[];

  constructor() {
   }

  ngOnInit() {
    this.reviews = [];

    firebase.firestore().collection("reviews").where("placeId", "==", this.placeId)
    .get()
    .then( 
      (querySnapshot) => {
        querySnapshot.forEach( (doc) => { 
        this.reviews.push(doc.data()); 
        });
      }
    );
  }


}
