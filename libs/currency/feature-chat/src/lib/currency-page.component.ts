import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { CRYPTO_CURRENCY_CODES_AND_NAMES, CryptoCurrencyCode, CryptoCurrencyFacade } from '@bp/currency/data-access';
import { IdName } from '@bp/shared-ui';

@Component({
	selector: 'bp-currency-page',
	templateUrl: './currency-page.component.html',
	styleUrls: ['./currency-page.component.scss'],
})
export class CurrencyPageComponent implements OnInit {
	buttons: IdName[] = Object.keys(CRYPTO_CURRENCY_CODES_AND_NAMES).map((key) => ({
		id: key,
		name: CRYPTO_CURRENCY_CODES_AND_NAMES[key as CryptoCurrencyCode],
	}));

	constructor(
		public cryptoCurrencyFacade: CryptoCurrencyFacade,
		private route: ActivatedRoute,
		private router: Router) {
	}

	ngOnInit() {
		this.route.params.pipe(take(1))
			.subscribe(({ currencyId }) => this.setCurrentCurrency(currencyId as CryptoCurrencyCode | 'BTC'));
	}

	onChoose(id: IdName['id']): void {
		this.router.navigate(['currencies', id]);
		this.setCurrentCurrency(id as CryptoCurrencyCode);
	}

	private setCurrentCurrency(cryptoCurrencyCode: CryptoCurrencyCode): void {
		this.cryptoCurrencyFacade.setCurrentCurrency(cryptoCurrencyCode);
	}
}
