import './css/broadcast-frame.css';
import { Formatted } from './utils/formatted.ts';

export class BroadcastFrame extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {

		const width: number = Formatted.formatNumberAttribute( this.getAttribute( 'width' ), 3 );
		const haloSize: number = Formatted.formatNumberAttribute( this.getAttribute( 'halo-size' ), 0 );
		// const volume: number = Formatted.formatNumberAttribute( this.getAttribute( 'volume' ), 0 );
		const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '#ff9900' );

		this.style.border = `${ width }px solid ${ color }`;
		this.style.boxShadow = `0 0 ${ haloSize }px ${ color }`;

	}

	render() {

		this.className = 'broadcast-frame';

		const width: number = Formatted.formatNumberAttribute( this.getAttribute( 'width' ), 3 );
		const haloSize: number = Formatted.formatNumberAttribute( this.getAttribute( 'halo-size' ), 0 );
		// const volume: number = Formatted.formatNumberAttribute( this.getAttribute( 'volume' ), 0 );
		const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '#ff9900' );

		this.style.border = `${ width }px solid ${ color }`;
		this.style.boxShadow = `0 0 ${ haloSize }px ${ color }`;

		this.rendered = true;

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

	}

	static get observedAttributes() {

		return [

			'width',
			'halo-size',
			'color',
			'volume',

		];
	
	}

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

};

customElements.define( 'broadcast-frame', BroadcastFrame );
