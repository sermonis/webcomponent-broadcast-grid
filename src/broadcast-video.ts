import './css/broadcast-video.css';
import { Formatted } from './utils/formatted.ts';

export class BroadcastVideo extends HTMLElement {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {

		const muted: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'muted' ), false );
		const loop: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'loop' ), false );
		const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' );
		const posted: string = Formatted.formatStringAttribute( this.getAttribute( 'posted' ), '' );
		const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
		const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

		const video = this.querySelector<HTMLElement>( '.broadcast-video__video' );

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

		this.className = 'broadcast-video';

		const muted: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'muted' ), false );
		const loop: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'loop' ), false );
		const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' );
		const posted: string = Formatted.formatStringAttribute( this.getAttribute( 'posted' ), '' );
		const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
		const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

		this.innerHTML = `
		
			<video
			
				class="broadcast-video__video"
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

customElements.define( 'broadcast-video', BroadcastVideo );
