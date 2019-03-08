import { Component, OnInit, Input , NgZone} from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { TileMutexService } from "../tile-mutex.service";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-placetile',
  templateUrl: './placetile.component.html',
  styleUrls: ['./placetile.component.css']
})
export class PlacetileComponent implements OnInit {

  @Input() placeId:string;
  @Input() index:number;
  @Input() last:number;
  placeName:string;
  image1:string;
  averageRating:number;
  numberOfReviews:number;

  reviews: object[];

  firestore;

  

  constructor(private tileMutex: TileMutexService, private zone:NgZone) {  
   }
  ngOnInit() {
    this.reviews = [];
    this.firestore = firebase.firestore();
    var reviews = this.firestore.collection("reviews");
    var query = reviews.where("placeId", "==", this.placeId)
    .get()
    .then((querySnapshot) => {
      this.processReviews(querySnapshot);
      this.subscribe();
    });
    console.log('last: '+this.last);
    }

    processReviews( querySnapshot ){

      querySnapshot.forEach(
        (doc) => {
          this.reviews.push(doc.data()); 
        }
      );
      
      this.calculateAverageRating();
      
      this.placeName = this.reviews[0]['place'];
    }

    subscribe(){
      this.tileMutex.apiInUse.subscribe( 
        (apiInUse) => {
          
          let numberFromApi:number = apiInUse['index'];
          numberFromApi++;

          if ( apiInUse['value'] === false && this.index == numberFromApi && this.image1 === undefined){
           this.tileMutex.letOthersKnow( {'value':true, 'index':this.index} ); 
           this.getPictureFromApi();
          } 
        } 
      );
    }

    getPictureFromApi():any{

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
       // console.log('status: '+status);
        if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT ){
          setTimeout( () => {this.getPictureFromApi()} , 2000);
        }
        else
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          if(place['photos'] !== undefined ) this.image1 = place['photos'][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
          else this.image1 = ' ';

          if ( this.index === this.last ) this.tileMutex.letOthersKnow( {'value':false, 'index':-1} );

          else  this.tileMutex.letOthersKnow( {'value':false, 'index':this.index} );
        }
      });
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
