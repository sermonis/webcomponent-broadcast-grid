import './css/bc-cell.css';
import { Formatted } from './utils/formatted.ts';

export class BcCell extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	/**
	 * 
	 */
	// onZoom( e: Event ) {

	// 	const video: HTMLVideoElement | null = this.querySelector( '.broadcast-video__video' );
		
	// 	if ( video ) {



	// 	}

	// }

	update() {

		const rounded: string = Formatted.formatValues( this.getAttribute( 'rounded' ), '6' );
		const elevation: string = Formatted.formatValues( this.getAttribute( 'elevation' ), '2' );
		const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '#333333' );
		const image: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '' );
		const disabled: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'disabled' ), false );

		this.style.borderRadius = rounded;
		this.style.boxShadow = `0 0 ${ elevation } #00000099`;
		this.style.backgroundColor = color;
		this.style.backgroundImage = `${ image }`;

		this.classList.toggle( 'bc-cell_disabled', disabled );

	}

	render() {

		this.className = 'bc-cell';

		const rounded: string = Formatted.formatValues( this.getAttribute( 'rounded' ), '6' );
		const elevation: string = Formatted.formatValues( this.getAttribute( 'elevation' ), '2' );
		const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '#333333' );
		const image: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), '' );
		const disabled: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'disabled' ), false );

		this.style.borderRadius = rounded;
		this.style.boxShadow = `0 0 ${ elevation } #00000099`;
		this.style.backgroundColor = color;
		this.style.backgroundImage = `${ image }`;

		this.classList.toggle( 'bc-cell_disabled', disabled );

		this.rendered = true;

	}

	// addEvents() {

	// 	this.addEventListener( 'click',  )

	// }

	// removeEvents() {

	// }

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

	}

	static get observedAttributes() {

		return [

			'rounded',
			'elevation',
			'color',
			'image',
			'disabled',

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

customElements.define( 'bc-cell', BcCell );
