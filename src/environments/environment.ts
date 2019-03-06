// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var require: any;
require("firebase/storage");
export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDuYRpTJp2l_FolZBIE1-n2oIp1FnSs7e8",
    authDomain: "burgersandbloody-1548921763418.firebaseapp.com",
    databaseURL: "https://burgersandbloody-1548921763418.firebaseio.com",
    projectId: "burgersandbloody-1548921763418",
    storageBucket: "burgersandbloody-1548921763418.appspot.com",
    messagingSenderId: "1020185597648"
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
