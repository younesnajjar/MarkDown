// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    demo: 'saas', // other possible options are creative and modern
    GOOGLE_MAPS_API_KEY: 'AIzaSyDpgQMpcfx1QU-8SM-ljcgjG4xrYtIYby4',
    max_menu_notifs: 7,
    // base_url: 'http://192.168.101.38:5006',
    base_url: 'http://localhost:3000',      // testing errors handelers
    multi_user: false,
    enable_push_notification: false,
    firebase: {
        apiKey: "AIzaSyAIt8iKuFb7mzcJ051Mli0zMGklvRrqGfk",
        authDomain: "theclub-e315e.firebaseapp.com",
        projectId: "theclub-e315e",
        storageBucket: "theclub-e315e.appspot.com",
        messagingSenderId: "167931756056",
        appId: "1:167931756056:web:028095b9ba5f19241c8d6d",
        measurementId: "G-P20N3X59Q7"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
