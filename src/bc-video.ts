import './css/bc-video.css';
import { Formatted } from './utils/formatted.ts';
// import { 
	
// 	type TMediaSource,

// } from './@types/intex.types';
import { PropObserver } from './utils/prop-observer.ts';

export class BcVideo extends HTMLElement {

	private rendered: boolean = false;
	public srcObject: PropObserver;

	constructor() {

		super();

		this.srcObject = new PropObserver();

	}

	update() {

		const muted: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'muted' ), false );
		const loop: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'loop' ), false );
		const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' );
		const posted: string = Formatted.formatStringAttribute( this.getAttribute( 'posted' ), '' );
		const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
		const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

		const video = this.querySelector<HTMLVideoElement>( '.bc-video__video' );

		if ( video ) {

			muted && video.setAttribute( 'muted', '' );
			loop && video.setAttribute( 'loop', '' );
			controls && video.setAttribute( 'controls', '' );
			autoplay && video.setAttribute( 'autoplay', '' );
			
			video.setAttribute( 'src', src );
			video.setAttribute( 'posted', posted );

		}

	}

	render() {

		this.className = 'bc-video';

		const muted: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'muted' ), false );
		const loop: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'loop' ), false );
		const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' );
		const posted: string = Formatted.formatStringAttribute( this.getAttribute( 'posted' ), '' );
		const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
		const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

		this.innerHTML = `
		
			<video
			
				class="bc-video__video"
				src="${ src }"
				posted="${ posted }"
				${ loop ? 'loop': '' }
				${ autoplay ? 'autoplay': '' }
				${ muted ? 'muted': '' }
				${ controls ? 'controls': '' }

			>

			</video>
		
		`;

		this.rendered = true;

		this.srcObject.subscribe( () => {

			const video = this.querySelector<HTMLVideoElement>( '.bc-video__video' );

			if ( !!video ) {

				video.srcObject = this.srcObject.value;

				video.play();

			}

		} );

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

	}

	static get observedAttributes() {

		return [

			'muted',
			'loop',
			'autoplay',
			'controls',
			'src',
			'posted',

		];
	
	}

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

};

customElements.define( 'bc-video', BcVideo );
