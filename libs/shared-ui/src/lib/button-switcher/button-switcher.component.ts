import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IdName } from '@bp/shared-ui';

@Component({
	selector: 'bp-button-switcher',
	templateUrl: './button-switcher.component.html',
	styleUrls: ['./button-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSwitcherComponent {
	@Input() buttons: IdName[] = [];
	@Input() selectedId: IdName['id'] | null = null;

	@Output() choose = new EventEmitter<IdName['id']>();

	onSelect(id: IdName['id']) {
		if (id !== this.selectedId) {
			this.choose.emit(id);
		}
	}
}
