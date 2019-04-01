// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var require: any;
require("firebase/storage");
export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDSs2ptd2Dzi9C5XxNGffXy-ushVBabyOM",
    authDomain: "habib-e7999.firebaseapp.com",
    databaseURL: "https://habib-e7999.firebaseio.com",
    projectId: "habib-e7999",
    storageBucket: "habib-e7999.appspot.com",
    messagingSenderId: "593669101940"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
