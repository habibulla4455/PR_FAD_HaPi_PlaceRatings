
import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})

export class AddRatingComponent{

  // google places variables 
  address: Object;
  establishmentAddress: Object;
  formattedEstablishmentAddress: string;
  phone: string;// not used anywhere, but i might want to add it later. 

  // database variables 
  firestore;
  brunchPlace:string;
  placeId:string;
  funInterestingRating:number;
  groupHangoutRating:number;
  learnEntertainmentRating:number;
  personalFavRating:number;
  words:string;

  //Fun_Interesting , Group Hangout, Learn_Entertainment, Personal Fav


  // map variable
  mapStyle;
  geocoder:google.maps.Geocoder;

  // list to repeat on 
  thingsToRate:['Fun_Interesting','Learn_Entertainment','Group_Hangout','Personal_Fav'];

  user;

  //error handling variables
  error:boolean=true;
  saveError:boolean;
  placeErrorMessage:string;
  ratingErrorMessage:string;
  noPlace:boolean = false;
  noRating:boolean = false;



  constructor(public zone: NgZone, private router: Router) {

    this.placeErrorMessage='';
    this.ratingErrorMessage='';

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) { // user is signed in.
        this.user = user;
        this.error=false;
      } else { // user is NOT signed in.
        this.placeErrorMessage = 'You must be signed in to leave a review.';
        this.error = true;
      }
    });

    this.thingsToRate=['Fun_Interesting','Learn_Entertainment','Group_Hangout','Personal_Fav'];
    
    this.firestore = firebase.firestore();

    this.geocoder = new google.maps.Geocoder();

    this.mapStyle = this.getMapStyle();

  }//end constructor

  ngAfterViewInit(){
    this.setMap('Hyderabad, Telangana',14);// initialize the map
  } // end ngAfterViewInit

  addButtonHandler(s){

    this.placeErrorMessage = '';
    this.ratingErrorMessage = '';

    if ( this.brunchPlace === undefined ){
      this.noPlace = true;
      this.placeErrorMessage = "Think, McFly! Think! What place you are trying to rate?";
    }

    if ( this.funInterestingRating === undefined && this.learnEntertainmentRating === undefined && this.groupHangoutRating === undefined && this.personalFavRating === undefined ){
      this.noRating = true;
      if (this.placeErrorMessage != '' ) this.ratingErrorMessage += "\n Also, you ";
      else this.ratingErrorMessage += "You ";
      this.ratingErrorMessage += "have to rate at least 1 thing, otherwise what's the point?";
    }

    if ( this.noPlace || this.noRating ) return null;


    if (this.user) { // User is signed in. redundant, but a little extra security.

      
      try{
      this.firestore.collection("reviews").doc().set( 
        
        this.setReview()
        
        )
      .then( () => {// Document successfully written
          this.updateUsersOtherReviews();
          this.router.navigate(['/viewRatings']); 
      })
      .catch( (error) => {
        console.error("Error writing document: ", error);
          
      });
    } catch(e){
      this.placeErrorMessage = 'There was a problem saving your rating:';
          this.placeErrorMessage +=  e.message;
          this.error = true;
    }
    
    
    
    } else {// user is NOT signed in. again, redundant.
      this.error = true;
    }
  }

  ratingComponentClick(clickObj: any): void {
    
      if(clickObj.menuItem === 'funInteresting') this.funInterestingRating = clickObj.rating;
      if(clickObj.menuItem === 'Group_Hangout') this.groupHangoutRating = clickObj.rating;
      if(clickObj.menuItem === 'Learn_Entertainment') this.learnEntertainmentRating = clickObj.rating;
      if(clickObj.menuItem === 'Personal_Fav') this.personalFavRating = clickObj.rating;

  }

  dropdownReceiver(clickObj : any){
      this.noRating = false;
      this.ratingErrorMessage = '';
      if(clickObj.item === 'Fun_Interesting') this.funInterestingRating = clickObj.rating;
      if(clickObj.item === 'Group_Hangout') this.groupHangoutRating = clickObj.rating;
      if(clickObj.item === 'Learn_Entertainment') this.learnEntertainmentRating = clickObj.rating;
      if(clickObj.item === 'Personal_Fav') this.personalFavRating = clickObj.rating;
  }


  //Utility Methods Below

  setReview(){
    return {
      email: this.user.email,
      place: this.brunchPlace,
      placeId: this.placeId,
      Fun_Interesting: this.funInterestingRating === undefined ? '': this.funInterestingRating,
      Learn_Entertainment: this.learnEntertainmentRating === undefined ? '': this.learnEntertainmentRating,
      Group_Hangout: this.groupHangoutRating === undefined ? '': this.groupHangoutRating,
      Personal_Fav: this.personalFavRating === undefined ? '': this.personalFavRating,
      overallRating: this.getOverallRating(),
      displayName: this.user.displayName,
      words: this.words,
      reviewDate : this.getTodaysDate(),
      numberOfReviews : 1,
      userImageURL : this.user.photoURL
    };
  }

  updateUsersOtherReviews(){
    
    this.firestore.collection("reviews").where("email", "==", this.user.email )
    .get()
    .then(
      ( querySnapshot ) => {
        
        let numberOfReviews = querySnapshot.size;
        querySnapshot.forEach(
          (doc) => {
            this.firestore.collection("reviews").doc(doc.id).update({ numberOfReviews : querySnapshot.size, userImageURL : this.user.photoURL});
          }
        );

      }
    );
  }

  setMap( address:string, zoom:number ){ //utility method to set location and recenter map.
    this.geocoder.geocode( 
      { 'address': address}, 
      (results, status) => {
        var map = new google.maps.Map( 
          document.getElementById('map'), 
          {
            zoom: zoom, 
            center: results[0].geometry.location,
            disableDefaultUI: true,
            styles: this.mapStyle
            } 
          );
        new google.maps.Marker({ map: map, position: results[0].geometry.location });
        }
      );
    } 


  getEstablishmentAddress(place: object) {//called when google places component emits location

    this.noPlace = false;
    this.placeErrorMessage = '';

    // set map
    this.setMap(place['formatted_address'],15);

    this.brunchPlace = place['name'];
    this.placeId = place['place_id'];

    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];
    });

    //this.image1 = place['photos'][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
    //this.image2 = place['photos'][1].getUrl({'maxWidth': 300, 'maxHeight': 300});
    //this.image3 = place['photos'][2].getUrl({'maxWidth': 300, 'maxHeight': 300});
   
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }

  getOverallRating(){

    var numberOfRatings = 4;
    if ( this.funInterestingRating === undefined ) { this.funInterestingRating = 0; numberOfRatings--;}
    if ( this.learnEntertainmentRating === undefined )  { this.learnEntertainmentRating = 0;  numberOfRatings--;}
    if ( this.groupHangoutRating === undefined ) { this.groupHangoutRating = 0; numberOfRatings--;}
    if ( this.personalFavRating === undefined )  { this.personalFavRating = 0;  numberOfRatings--;}
    if ( this.words === undefined )  { this.words = ''; }

    var overallRating = (this.funInterestingRating+this.learnEntertainmentRating+this.groupHangoutRating+this.personalFavRating)/numberOfRatings;
    return Math.round(overallRating);
  }

  getTodaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  getMapStyle(){

    return [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ];

  }


}


