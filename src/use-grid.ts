import { BroadcastCell } from './broadcast-cell.ts';
import { BroadcastGrid } from './broadcast-grid.ts';

export function useGrid() {

	customElements.define( 'broadcast-cell', BroadcastCell );
	customElements.define( 'broadcast-grid', BroadcastGrid );

	return {

		BroadcastCell,
		BroadcastGrid,

	};

};
