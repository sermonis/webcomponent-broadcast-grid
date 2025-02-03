import './css/bc-layer.css';
// import { Formatted } from './utils/formatted.ts';

export class BcLayer extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {


	}

	render() {

		this.className = 'bc-layer';

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

customElements.define( 'bc-layer', BcLayer );
