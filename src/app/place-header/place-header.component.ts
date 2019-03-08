import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-place-header',
  templateUrl: './place-header.component.html',
  styleUrls: ['./place-header.component.css']
})
export class PlaceHeaderComponent implements OnInit {

  image1:string;
  image2:string;
  image3:string;
  @Input() placeId:string;
  placeName:string;
  averageRating:number;
  numberOfReviews:number;

  reviews: object[];


  constructor(private readonly route: ActivatedRoute, private readonly router: Router,) { 
  }

  ngOnInit() {

    this.reviews = [];

    firebase.firestore().collection("reviews").where("placeId", "==", this.placeId)
    .get()
    .then( (querySnapshot) => {
      this.processReviews( querySnapshot );
     // this.image1 = this.reviews[0]['image1'];
     // this.image2 = this.reviews[0]['image2'];
      //this.image3 = this.reviews[0]['image3'];
      this.placeName = this.reviews[0]['place'];
      this.getPictureFromApi();
    });
  }

  getPictureFromApi(){

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });
    var request = {
      placeId: this.placeId,
      fields: ['photos']
    };

    new google.maps.places.PlacesService(map)
    .getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if(place['photos'] !== undefined && place['photos'][0] !== undefined) this.image1 = place['photos'][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
        if(place['photos'] !== undefined && place['photos'][1] !== undefined) this.image2 = place['photos'][1].getUrl({'maxWidth': 300, 'maxHeight': 300});
        if(place['photos'] !== undefined && place['photos'][2] !== undefined) this.image3 = place['photos'][2].getUrl({'maxWidth': 300, 'maxHeight': 300});

      }
    });
  }

  processReviews( querySnapshot ){

    querySnapshot.forEach(
      (doc) => {
        this.reviews.push(doc.data()); 
      });
  
      this.calculateAverageRating();
}

calculateAverageRating(){

  this.numberOfReviews = this.reviews.length;
    
  var total = 0;
  this.reviews.forEach( (review) => {
    total += review['overallRating'];
  } );
  this.averageRating = total / this.numberOfReviews;
  this.averageRating = Math.round(this.averageRating);

}



  
}
