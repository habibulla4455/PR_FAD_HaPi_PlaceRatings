import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-placetile',
  templateUrl: './placetile.component.html',
  styleUrls: ['./placetile.component.css']
})
export class PlacetileComponent implements OnInit {

  @Input() placeId:string;
  placeName:string;
  image1:string;
  averageRating:number;
  numberOfReviews:number;

  reviews: object[];

  firestore;

  constructor() {    }

  ngOnInit() {

    this.reviews = [];
    this.firestore = firebase.firestore();
    var reviews = this.firestore.collection("reviews");
    var query = reviews.where("placeId", "==", this.placeId)
    .get()
    .then((querySnapshot) => {
      this.processReviews(querySnapshot);
    });
    
  }

  processReviews( querySnapshot ){

    querySnapshot.forEach(
      (doc) => {
        this.reviews.push(doc.data()); 
      }
    );
    
    this.calculateAverageRating();
    
    this.image1 = this.reviews[0]['image1'];
    this.placeName = this.reviews[0]['place'];
  }

  calculateAverageRating(){

    this.numberOfReviews = this.reviews.length;
    var total = 0;

    this.reviews.forEach( 
      (review) => {
        total += review['overallRating'];
      }
    );

    this.averageRating = total / this.numberOfReviews;
    this.averageRating = Math.round(this.averageRating);
  }

}
