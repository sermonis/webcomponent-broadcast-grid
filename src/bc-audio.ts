import './css/bc-audio.css';
import { Formatted } from './utils/formatted.ts';
// import { 
    
// 	type TMediaSource,

// } from './@types/intex.types';
import { PropObserver } from './utils/prop-observer.ts';

export class BcAudio extends HTMLElement {

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
        const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
        const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

        const audio = this.querySelector<HTMLAudioElement>( '.bc-audio__audio' );

        if ( audio ) {

            muted && audio.setAttribute( 'muted', '' );
            loop && audio.setAttribute( 'loop', '' );
            controls && audio.setAttribute( 'controls', '' );
            autoplay && audio.setAttribute( 'autoplay', '' );
            
            audio.setAttribute( 'src', src );

        }

    }

    render() {

        this.className = 'bc-audio';

        const muted: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'muted' ), false );
        const loop: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'loop' ), false );
        const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' );
        const controls: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'constrols' ), false );
        const autoplay: boolean = Formatted.formatBooleanAttribute( this.getAttribute( 'autoplay' ), false );

        this.innerHTML = `
        
            <audio
            
                class="bc-audio__audio"
                src="${ src }"
                ${ loop ? 'loop': '' }
                ${ autoplay ? 'autoplay': '' }
                ${ muted ? 'muted': '' }
                ${ controls ? 'controls': '' }

            >

            </audio>
        
        `;

        this.rendered = true;

        this.srcObject.subscribe( () => {

            const audio = this.querySelector<HTMLAudioElement>( '.bc-audio__audio' );

            if ( !!audio ) {

                audio.srcObject = this.srcObject.value;

                audio.play();

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

        ];
    
    }

    attributeChangedCallback() {

        if ( this.rendered ) {

            this.update();

        }

    }

};

customElements.define( 'bc-audio', BcAudio );
