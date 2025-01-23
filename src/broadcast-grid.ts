import './css/broadcast-grid.css';
import { Formatted } from './utils/formatted.ts';
import { Transform } from './utils/transform.ts';
import { type IAspectRatio } from './utils/parsers/aspect-ratio.ts';

interface IBroadcastGrid {

	gap?: number;
	aspectRatio?: IAspectRatio;

};

export class BroadcastGrid extends HTMLElement implements IBroadcastGrid {

	private ro!: ResizeObserver;
	private mo!: MutationObserver;
	private rendered!: boolean;
	public  gap!: number;
	public  aspectRatio!: IAspectRatio;

	constructor() {

		super();

		this.aspectRatio = { w: 16, h: 9 };

	}

	private gapTotalSize( n: number ): number {

		return ( n - 1 ) * this.gap;

	}

	/**
	 * 
	 */
	private locateCell(
		
			el: HTMLElement,
			cols: number,
			rows: number,
			x: number,
			y: number,
			w: number,
			h: number,
		
		): void {

		// центр грида
		const centerX = this.clientWidth / 2;
		const centerY = this.clientHeight / 2;

		// центр строки
		const rowCenter = ( cols * w + this.gapTotalSize( cols ) ) / 2;

		// центр столбца
		const colCenter = ( rows * h + this.gapTotalSize( rows ) ) / 2;

		// координаты по вертикали
		const posY = centerY - colCenter + y * h + this.gapTotalSize( y + 1 );

		// координаты по горизонтали
		const posX = centerX - rowCenter + x * w + this.gapTotalSize( x + 1 );

		// трансформация ячеек
		Transform.moveTo( el, { x: posX, y: posY } );
		Transform.scale( el, { w, h } );

	}

	private countCell(): void {

		const gw = this.clientWidth;
		const gh = this.clientHeight;

		const cells = this.querySelectorAll<HTMLElement>( '.broadcast-cell' );

		if ( cells instanceof NodeList ) {

			const cellCount = cells.length;

			let cols = 1;
			let rows = 0;
			let topHeight = 0;

			for ( ; cols <= cellCount; cols++ ) {

				rows = Math.ceil( cellCount / cols );

				topHeight = rows * this.aspectRatio.h / this.aspectRatio.w * ( gw - this.gapTotalSize( cols ) ) / cols;

				if ( topHeight <= ( gh - this.gapTotalSize( rows ) ) ) break;

			}

			// const k = ( topHeight >= gh ) ? gh / topHeight : 1;

			const cellWidth = ( gw - this.gapTotalSize( cols ) ) / cols;//  * k;

			const residualCols = cells.length % cols;

			for ( let cellIndex = 0; cellIndex < cells.length; cellIndex++ ) {

				this.locateCell( 

					cells[ cellIndex ],                                                         // el
					residualCols > 0 && Math.floor( cellIndex / cols ) === ( rows - 1 ) ? residualCols : cols, // cols count
					rows,                                                                       // rows count
					cellIndex % cols,                                                           // posX
					Math.floor( cellIndex / cols ),                                             // poxY
					cellWidth,                                                                  // cell width
					cellWidth * this.aspectRatio.h / this.aspectRatio.w,                        // cell height

				);

			}

		}

	}

	update() {

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );
		this.aspectRatio = Formatted.formatAspectRatio( this.getAttribute( 'aspect-ratio' ), '16/9' );

		const cells = this.querySelectorAll<HTMLElement>( '.broadcast-cell' );

		if ( cells instanceof NodeList ) {

			for ( const cell of cells ) {

				cell.style.aspectRatio = `${ this.aspectRatio.w }/${ this.aspectRatio.h }`;

			}

		}

		this.style.gap = `${ this.gap }px`;

		this.countCell();
		
	}

	render() {

		this.className = 'broadcast-grid';

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );
		this.aspectRatio = Formatted.formatAspectRatio( this.getAttribute( 'aspect-ratio' ), '16/9' );

		const cells = this.querySelectorAll<HTMLElement>( '.broadcast-cell' );

		if ( cells instanceof NodeList ) {

			for ( const cell of cells ) {

				cell.style.aspectRatio = `${ this.aspectRatio.w }/${ this.aspectRatio.h }`;

			}

		}

		this.style.gap = `${ this.gap }px`;

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

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};
