import { BroadcastCell } from './broadcast-cell.ts';
import { BroadcastLayer } from './broadcast-layer.ts';
import { BroadcastFrame } from './broadcast-frame.ts';
import { BroadcastGrid } from './broadcast-grid.ts';
import { BroadcastAvatar } from './broadcast-avatar.ts';
import { BroadcastVideo } from './broadcast-video.ts';

export function useGrid() {

	customElements.define( 'broadcast-cell', BroadcastCell );
	customElements.define( 'broadcast-layer', BroadcastLayer );
	customElements.define( 'broadcast-frame', BroadcastFrame );
	customElements.define( 'broadcast-grid', BroadcastGrid );
	customElements.define( 'broadcast-avatar', BroadcastAvatar );
	customElements.define( 'broadcast-video', BroadcastVideo );

};
