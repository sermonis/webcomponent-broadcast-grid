import './css/broadcast-layer.css';
import { Formatted } from './utils/formatted.ts';

export class BroadcastOverflow extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {


	}

	render() {

		this.className = 'broadcast-overflow';

		const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '#000000' );
		const opacity: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '50%' );
		const filter: string = Formatted.formatStringAttribute( this.getAttribute( 'filter' ), 'none' );

		this.rendered = true;

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

	}

	static get observedAttributes() {

		return [

		];
	
	}

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};
