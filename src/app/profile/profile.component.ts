import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  reviews: object[];
  userEmail:string;
  userDisplayName:string;
  userImage:string;
  showChangePicture:boolean;
  user;

  constructor( private readonly route: ActivatedRoute, private readonly router: Router) { 
  }

  loadUser(){
    this.reviews = [];

    firebase.firestore().collection("reviews").where("email", "==", this.userEmail)
    .get()
    .then( 
      (querySnapshot) => {
        this.populateReviews(querySnapshot);
        this.getPictureFromAPI();
      }
    );
  }




  populateReviews(querySnapshot){

    this.reviews = [];
    querySnapshot.forEach( (doc) => { 
      this.reviews.push(doc.data()); 
    });

    this.user = firebase.auth().currentUser;
    this.showChangePicture = false;
    
    if( this.user && this.user.email === this.userEmail){
      this.showChangePicture = true;
    }
    
    this.reviews.sort(  
      (a,b) => (a['reviewDate'] < b['reviewDate']) ? 1 : -1 );
  }

   getPictureFromAPI(){
    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });

    for (const review of this.reviews) {
      this.doAPICall(review,map);
    }
  }

  doAPICall(review,map){
    var request = {
      placeId: review['placeId'],
      fields: ['photos']
    };
    new google.maps.places.PlacesService(map)
    .getDetails(request, (place, status) => {
      //console.log('status: '+status);
      if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT ){
        setTimeout( () => {this.doAPICall(review,map)} , 2000);
      }
      else
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if(place['photos'] !== undefined ) review['image1'] = place['photos'][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
        else review['image1'] =  ' ';
      }
    });
  }

  
  ngOnInit() {

    this.showChangePicture = false;

    this.route.params.subscribe(params => {
      this.userEmail = params['email'];//.get("email");
      this.userDisplayName = this.userEmail.substring(0, this.userEmail.lastIndexOf("@"));
      firebase.storage().ref().child( this.userEmail )
      .getDownloadURL()
      .then(
        (url) => {
          this.userImage = url;
          this.loadUser();
          }
        )
        .catch( 
          () => {
            this.userImage = '';
            this.loadUser();
          }
          
        )
        ;
    });
  }













  updateUserImage(){

    firebase.storage().ref().child( this.userEmail )
    .getDownloadURL()
    .then( (url) => {
        this.userImage = url;
        this.user.updateProfile({photoURL: url, displayName: this.user.displayName})
        .then( () => { 
            this.updateReviews();
            }
          );
        }
      );
    }

  updateReviews(){
    firebase.firestore().collection("reviews").where("email", "==", this.user.email )
    .get()
    .then(
      ( querySnapshot ) => {
        querySnapshot.forEach( (doc) => {
            firebase.firestore().collection("reviews").doc(doc.id).update({userImageURL : this.user.photoURL});
            } 
          );
        }
      );
    }



  upload( imageInput: any ){

    if (this.user) { // if user is signed in
      
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      
      reader.addEventListener('load', 
        (event: any) => {

          firebase.storage().ref().child( this.userEmail )
          .put( file )
          .then( 
            (snapshot) => {//file was successfully uploaded
              this.updateUserImage();          
            }
          );      
        }
      );
      reader.readAsDataURL(file);
    }// end if user is signed in
  } // end upload method

}
