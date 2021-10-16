import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPageComponent } from './currency-page.component';
import { Route, RouterModule } from '@angular/router';
import { ButtonSwitcherModule } from '@bp/shared-ui';
import { CurrencyUiModule } from '@bp/currency/ui';

export const currencyFeatureRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		component: CurrencyPageComponent,
	},
	{
		path: ':currencyId',
		component: CurrencyPageComponent,
	},
];
@NgModule({
	imports: [
		CommonModule,
		ButtonSwitcherModule,
		CurrencyUiModule,
		RouterModule.forChild(currencyFeatureRoutes),
	],
	declarations: [CurrencyPageComponent],
})
export class CurrencyFeatureChatModule {}
