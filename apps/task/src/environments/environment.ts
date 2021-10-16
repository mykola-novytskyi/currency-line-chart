/*
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 */

export const environment = {
	production: false,
	firebaseConfig: {
		apiKey: 'AIzaSyBlTgmKN7hPNG_A1EqaPyVHF668SkfFl4s',
		authDomain: 'angular-dev-test-task.firebaseapp.com',
		projectId: 'angular-dev-test-task',
		storageBucket: 'angular-dev-test-task.appspot.com',
		messagingSenderId: '978693463659',
		appId: '1:978693463659:web:7aa38253892da9c0b15b2e',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// Import 'zone.js/dist/zone-error';  // Included with Angular CLI.
