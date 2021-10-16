import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CurrencyShellModule } from '@bp/currency/shell';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireFunctionsModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: '/currencies/BTC', pathMatch: 'full' },
			{ path: '**', redirectTo: '/currencies/BTC'}
		]),
		CurrencyShellModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
