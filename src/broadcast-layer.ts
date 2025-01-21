import './css/broadcast-layer.css';
// import { Formatted } from './utils/formatted.ts';

export class BroadcastLayer extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {


	}

	render() {

		this.className = 'broadcast-layer';

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
