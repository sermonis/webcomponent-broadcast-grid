import './css/broadcast-avatar.css';
import { Formatted } from './utils/formatted';
import { Color } from './utils/color';

export class BroadcastAvatar extends HTMLElement {

	private imageId!: string;
	private rendered!: boolean;

    constructor () {

      super();

	  this.imageId = `image-${ Date.now() }`;

    }

	update() {

        const name: string = Formatted.formatStringAttribute( this.getAttribute( 'name' ), '' ); 
        const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' ); 
        const size: string = Formatted.formatValues( this.getAttribute( 'size' ), '40%' );
        const bordered: string = Formatted.formatValues( this.getAttribute( 'bordered' ), '0px' );
        const borderColor: string = Formatted.formatStringAttribute( this.getAttribute( 'border-color' ), '#333333' );
        const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), 'accent' );
        const fontSize: string = Formatted.formatValues( this.getAttribute( 'width' ), '32px' );

        this.style.width = size;
        this.style.height = size;

		const image = this.querySelector<HTMLElement>( '.broadcast-avatar__image' );

		if ( image ) {

			image.style.outline = `${ bordered } solid ${ borderColor }`;

		}

		const fill = this.querySelector<HTMLElement>( '.broadcast-avatar__fill' );

		if ( fill ) {

			fill.setAttribute( 'fill', color );

		}

		const text = this.querySelector<HTMLElement>( '.broadcast-avatar__text' );

		if ( text ) {

			text.setAttribute( 'font-size', fontSize );
			text.setAttribute( 'fill', Color.contrastColor( color ) );
			
			text.innerText = Formatted.formatAvatarName( name );

		}

		const picture = this.querySelector<HTMLElement>( '.broadcast-avatar__picture' );

		if ( picture ) {

			picture.setAttribute( 'href', src );

		}

	}

    render() {

        this.classList.add( 'broadcast-avatar' );

        const name: string = Formatted.formatStringAttribute( this.getAttribute( 'name' ), '' ); 
        const src: string = Formatted.formatStringAttribute( this.getAttribute( 'src' ), '' ); 
        const size: string = Formatted.formatValues( this.getAttribute( 'size' ), '40%' );
        const bordered: string = Formatted.formatValues( this.getAttribute( 'bordered' ), '0px' );
        const borderColor: string = Formatted.formatStringAttribute( this.getAttribute( 'border-color' ), '#333333' );
        const color: string = Formatted.formatStringAttribute( this.getAttribute( 'color' ), 'accent' );
        const fontSize: string = Formatted.formatValues( this.getAttribute( 'width' ), '32px' );

        this.style.width = size;
        this.style.height = size;

        let innerHTML = `

            <svg
            
                viewBox="0 0 100 100"
                class="broadcast-avatar__image"


				width="100%"
				height="100%"

                style=" outline: ${ bordered } solid ${ borderColor }"
                
            >

        `;

		innerHTML += `

			<circle

				class="broadcast-avatar__fill"
				cx="50"
				cy="50"
				r="50"
				fill="${ color }"

			/>
		
			<text 
			
				class="broadcast-avatar__text"
				x="50%" 
				y="50%"
				alignment-baseline="middle" 
				text-anchor="middle"
				font-size="${ fontSize }"
				font-weight="600" 
				dy=".1em" 
				dominant-baseline="middle" 
				fill="${ Color.contrastColor( color ) }"
			
			>
			
				${ Formatted.formatAvatarName( name ) }
			
			</text>
		`;

        if ( !!src ) {

            innerHTML += `<defs>

                    <pattern

                        id="${ this.imageId }"
						class="broadcast-avatar__pattern"
                        patternUnits="userSpaceOnUse"
                        width="100"
                        height="100"
                    
                    >
                        
                        <image
                        
                            href="${ src }"
							class="broadcast-avatar__picture"
                            x="0"
                            y="0"
                            width="100"
                            height="100" />
                    
                    </pattern>
                
                </defs>

                <circle

					class="broadcast-avatar__circle"
                    cx="50"
                    cy="50"
                    r="50"
                    fill="url(#${ this.imageId })"

                />

            `;

        }

        innerHTML += '</svg>';

        this.innerHTML = innerHTML;

    }
  
    connectedCallback() {

        if ( !this.rendered ) {
        
            this.render();
            this.rendered = true;
        
        }

    }
  
    disconnectedCallback () {

    }
  
    static get observedAttributes() {
      
		return [ 
			
			'name',
			'color',
			'bordered',
			'src',
			'lazy-src',
			'border-color',
			'font-size'

		];
    
	}
  
    attributeChangedCallback() {
    
        this.update();

    }

}

customElements.define( 'broadcast-avatar', BroadcastAvatar );
