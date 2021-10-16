import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, take, tap } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { CryptoCurrencyCode, TURN_ON_REALTIME_CRYPTO_CURRENCY_PRICES_FB_FN } from './constants';
import { CurrencyPrice } from './currency-price.interface';

@Injectable({
	providedIn: 'root',
})
export class CryptoCurrencyFacade {
	currentCryptoCurrencyCode$: Observable<CryptoCurrencyCode>;
	currencyPrices$: Observable<CurrencyPrice[]> | undefined;

	private maxAmountSubject = new BehaviorSubject<number>(1000);
	private cryptoCurrencyCodeSubject = new BehaviorSubject<CryptoCurrencyCode>('BTC');

	constructor(private cryptoCurrencyRepository: CryptoCurrencyRepository, private aff: AngularFireFunctions) {
		this.currentCryptoCurrencyCode$ = this.cryptoCurrencyCodeSubject.asObservable();
		this.currencyPrices$ = this.currentCryptoCurrencyCode$
			.pipe(
				tap(currency => this.turnOnRealtimeCryptoCurrencyPrices(currency)),
				switchMap(currency => this.cryptoCurrencyRepository.getCurrencies(currency, this.maxAmountSubject.value)),
			);
	}

	setCurrentCurrency(cryptoCurrencyCode: CryptoCurrencyCode) {
		this.cryptoCurrencyCodeSubject.next(cryptoCurrencyCode);
	}

	private turnOnRealtimeCryptoCurrencyPrices(cryptoCurrencyCode: CryptoCurrencyCode): void {
		this.aff.httpsCallable(<string>TURN_ON_REALTIME_CRYPTO_CURRENCY_PRICES_FB_FN)({ cryptoCurrencyCode })
			.pipe(take(1)).subscribe();
	}
}
