import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME, CryptoCurrencyCode, CurrencyPrice } from '@bp/currency/data-access';

@Injectable({
	providedIn: 'root',
})
export class CryptoCurrencyRepository {
	constructor(private afs: AngularFirestore) {
	}

	getCurrencies(cryptoCurrencyCode: CryptoCurrencyCode, amount: number): Observable<any[]> {
		return this.afs.collection<CurrencyPrice>(
			`${CRYPTO_CURRENCIES_PRICES_COLLECTION_NAME}/${cryptoCurrencyCode}/prices`,
			ref => ref.limit(amount))
			.valueChanges();
	}
}
