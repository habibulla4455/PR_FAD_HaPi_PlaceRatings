import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { StarSystemComponent } from './add-rating/star-system/star-system.component';
import { AutocompleteComponent } from './google-places/google-places.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTitleComponent } from './app-title/app-title.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { ButtonComponent } from './button/button.component';
import { RatingComponent } from './rating/rating.component';
import { RegisterComponent } from './register/register.component';
import { CredentialsComponent } from './credentials/credentials.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { NavigationComponent } from './navigation/navigation.component';
import { PlaceComponent } from './place/place.component';
import { PlacetileComponent } from './placetile/placetile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PlaceHeaderComponent } from './place-header/place-header.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { ProfileComponent } from './profile/profile.component';
import { DropdownComponent } from './dropdown/dropdown.component';



const approutes : Routes = [
  { path : '', component: AppTitleComponent },
  { path : 'addRating', component: AddRatingComponent },
  { path : 'signIn', component: SignInComponent },
  { path : 'viewRatings', component: ViewRatingsComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'place/:placeId', component: PlaceComponent},
  { path : 'forgotPassword', component: ForgotPasswordComponent},
  { path : 'profile/:email', component: ProfileComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    AddRatingComponent,
    StarSystemComponent,
    AutocompleteComponent,
    NavBarComponent,
    AppTitleComponent,
    SignInComponent,
    ViewRatingsComponent,
    ButtonComponent,
    RatingComponent,
    RegisterComponent,
    CredentialsComponent,
    NavigationComponent,
    PlaceComponent,
    PlacetileComponent,
    ForgotPasswordComponent,
    PlaceHeaderComponent,
    PlaceDetailsComponent,
    ProfileComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(approutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule, // for database
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
