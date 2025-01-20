import './css/broadcast-grid.css';
import { Formatted } from './utils/formatted.ts';

interface IBroadcastGrid {

	gap?: number;
	aspectRatio?: string;

};

export class BroadcastGrid extends HTMLElement implements IBroadcastGrid {

	private ro!: ResizeObserver;
	private mo!: MutationObserver;
	private rendered!: boolean;
	public  gap!: number;
	public  aspectRatio!: string;

	constructor() {

		super();

	}

	private gapTotalSize( n: number, gap: number = 4 ): number {

		return ( n - 1 ) * gap;

	}

	private countCell(): void {

		const gw = this.clientWidth;
		const gh = this.clientHeight;

		const cells = this.querySelectorAll<HTMLElement>( '.broadcast-cell' );

		if ( cells instanceof NodeList ) {

			const cellCount = cells.length;

			let i = 1;

			for ( ; i < cellCount; i++ ) {

				const rows = Math.ceil( cellCount / i );

				const topHeight = rows * 9 / 16 * ( gw - this.gapTotalSize( i ) ) / i;

				if ( topHeight <= ( gh - this.gapTotalSize( rows ) ) ) {

					break;

				}

			}

			const cellWidth = ( gw - this.gapTotalSize( i ) ) / i;

			for ( const cell of cells ) {

				cell.style.flex = `0 0 ${ cellWidth }px`;

			}

		}

	}

	update() {

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );

		this.countCell();
		
	}

	render() {

		this.className = 'broadcast-grid';

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );

		this.attachShadow( { 'mode': 'open' } );

		if ( this.shadowRoot ) {

			this.shadowRoot.innerHTML = `<slot></slot>`;

		}

		this.rendered = true;

		this.ro = new ResizeObserver( this.countCell.bind( this ) );

		this.ro.observe( this );

		this.mo = new MutationObserver( this.countCell.bind( this ) );

		this.mo.observe( this, {

			childList: true,
			subtree: false,
			attributes: false,
			characterData: false,

		} );

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

		this.ro.disconnect();
		this.mo.disconnect();

	}

	static get observedAttributes() {

		return [

			'gap',
			'aspect-ratio',

		];
	
	}

	attributeChangedCallback(
		
		name: any,
		oldValue: any,
		newValue: any
	
	) {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};
