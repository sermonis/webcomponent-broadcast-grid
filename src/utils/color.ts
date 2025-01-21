import { ColorParser } from './parsers/color.js';

export class Color {

	static randomColor( useAlpha: boolean = false ): string {

		if ( typeof useAlpha !== 'boolean' ) { 
			
			throw new Error( `Color -> randomColor :: invalid useAlpha. Expected "boolean" type, got ${ typeof useAlpha }` );

		}

		const r: number = Math.floor( Math.random() * 255 );
		const g: number = Math.floor( Math.random() * 255 );
		const b: number = Math.floor( Math.random() * 255 );
		const a: number = useAlpha ? +Math.random().toFixed(2) : 1;

		return `rgba( ${r}, ${g}, ${b}, ${a} )`;

	}

	static contrastColor( color: string = '#000000' ): string {

		if ( typeof color !== 'string' ) { 
			
			throw new Error( `Color -> contrastColor :: invalid color. Expected "string" type, got ${ typeof color }` );

		}

		const parsedColor = ColorParser.parse( color );

		if ( [ 'rgb', 'hex' ].includes( parsedColor?.format ) ) {

			const max: number = 0.299 * 255 + 0.587 * 255 + 0.114 * 255;
			const total: number = 0.299 * parsedColor.r + 0.587 * parsedColor.g + 0.114 * parsedColor.b;

			if ( total / max > 0.5 ) return '#000000';

		}

		return '#ffffff';

	}

};
