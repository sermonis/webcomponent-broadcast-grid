import './css/bc-grid.css';
import { Formatted } from './utils/formatted.ts';
import { Position } from './utils/position.ts';
import { type IAspectRatio } from './utils/parsers/aspect-ratio.ts';
import { BcCell } from './bc-cell.ts';

interface IBcGrid {

	gap?: number;
	aspectRatio?: IAspectRatio;

	/**
	 * hooks
	 */

	onGridRecount?: Function;

};

export class BcGrid extends HTMLElement implements IBcGrid {

	private ro!: ResizeObserver;
	private mo!: MutationObserver;
	private rendered!: boolean;
	public  gap!: number;
	public  aspectRatio!: IAspectRatio;

	constructor() {

		super();

		this.aspectRatio = { w: 16, h: 9 };

	}

	/**
	 * Query selectors methods
	 */

	/**
	 *  @param { string } number
	 */
	public getCellByNum( n: number ): BcCell | null | undefined {

		return this.shadowRoot?.querySelector( `.bc-cell:nth-child( ${ n } )` );

	}

	/**
	 *  @param { string } id
	 */
	public getCellById( id: string ): BcCell | null | undefined {

		return this.shadowRoot?.getElementById( `${ id }` ) as BcCell;

	}

	/**
	 *  @param { string } name
	 */
	public getCellByUserName( name: string ): Array<BcCell> {

		const cells: NodeList | undefined = this.shadowRoot?.querySelectorAll( `.bc-cell[ name="${ name }" ]` );

		if ( cells ) {

			return Array.from( cells ) as Array<BcCell>

		}

		return [];

	}

	/**
	 * hooks
	 */

	/**
	 * fires if grid was recount
	 */
	onGridRecount: Function = () => {};

	/**
	 * fires if cell was appended
	 */
	onCellAppend: Function = () => {};

	/**
	 * fires if cell was removed
	 */
	onCellRemoved: Function = () => {};

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
		Position.moveTo( el, { x: posX, y: posY } );
		Position.scale( el, { w, h } );

	}

	private countCell(): void {

		const gw = this.clientWidth;
		const gh = this.clientHeight;

		const cells = this.querySelectorAll<HTMLElement>( '.bc-cell' );

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

		// тест события
		const event = new CustomEvent( 'recount', {

			bubbles: true,
			composed: true,
			detail: "composed"

		} );

		this.dispatchEvent( event );

		this.onGridRecount( {

			width: gw,
			height: gh,
			cells: cells.length,

		} );

	}

	update() {

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );
		this.aspectRatio = Formatted.formatAspectRatio( this.getAttribute( 'aspect-ratio' ), '16/9' );

		const cells = this.querySelectorAll<HTMLElement>( '.bc-cell' );

		if ( cells instanceof NodeList ) {

			for ( const cell of cells ) {

				cell.style.aspectRatio = `${ this.aspectRatio.w }/${ this.aspectRatio.h }`;

			}

		}

		this.style.gap = `${ this.gap }px`;

		this.countCell();
		
	}

	render() {

		this.className = 'bc-grid';

		this.gap = Formatted.formatNumberAttribute( this.getAttribute( 'gap' ), 4 );
		this.aspectRatio = Formatted.formatAspectRatio( this.getAttribute( 'aspect-ratio' ), '16/9' );

		const cells = this.querySelectorAll<HTMLElement>( '.bc-cell' );

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

customElements.define( 'bc-grid', BcGrid );
