import { Formatted } from './formatted';

interface ICoords {

	x?: string | number;
	y?: string | number;

};

interface ISize {

	w?: string | number;
	h?: string | number;

};

export class Transform {

	static moveTo( el: HTMLElement, coords: ICoords ): void {

		if ( !( el instanceof HTMLElement ) ) throw new Error( 'Transform -> moveTo :: invalid HTML Element' );

		const x: string | number = coords?.x !== undefined ? coords.x : 'auto';
		const y: string | number = coords?.y !== undefined ? coords.y : 'auto';

		const posX: string = Formatted.formatValues( x, 'auto' );
		const posY: string = Formatted.formatValues( y, 'auto' );

		el.style.left = posX;
		el.style.top = posY;

	}

	static scale( el: HTMLElement, sizes: ISize ): void {

		if ( !( el instanceof HTMLElement ) ) throw new Error( 'Transform -> moveTo :: invalid HTML Element' );

		const w: string | number = sizes?.w !== undefined ? sizes.w : 'auto';
		const h: string | number = sizes?.h !== undefined ? sizes.h : 'auto';

		const width: string = Formatted.formatValues( w, 'auto' );
		const height: string = Formatted.formatValues( h, 'auto' );

		el.style.width = width;
		el.style.height = height;

	}

};
