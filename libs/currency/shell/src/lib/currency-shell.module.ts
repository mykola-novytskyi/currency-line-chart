import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: 'currencies',
		loadChildren: () => import('@bp/currency/feature-chat').then((m) => m.CurrencyFeatureChatModule),
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CurrencyShellModule {}
