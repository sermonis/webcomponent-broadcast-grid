import { Size } from './parsers/size.ts';

export class Formatted {

	static formatStringAttribute ( val: string, valueDefault: string = '' ): string {

		try {

			if ( typeof valueDefault !== 'string' ) throw new Error( 'Formatted -> formatStringAttribute :: default value is not string' );

			if ( typeof val !== 'string' ) return valueDefault;

		} catch ( e ) {

			console.error( e );

		}

		return val;

	}

	static formatNumberAttribute ( val: string | null, valueDefault: number = 0 ): number {

		try {

			if ( typeof valueDefault !== 'number' ) throw new Error( 'Formatted -> formatNumberAttribute :: default value is not number' );

			if ( val === null ) return valueDefault;

			if ( isNaN( +val ) ) return valueDefault;

			return +val;

		} catch ( e ) {

			console.error( e );

		}

		return 0;

	}

	static formatBooleanAttribute ( val: string, valueDefault: boolean = false ): boolean {

		try {

			const values: Array< string > = [ 'true', 'false' ];

			if ( typeof valueDefault !== 'boolean' ) throw new Error( 'Formatted -> formatNumberAttribute :: default value is not boolean' );

			if ( typeof val === 'string' && values.includes( val ) ) return val === 'true';

			if ( typeof val === 'boolean' ) return val;

			if ( typeof val === 'string' || val === null ) {

				return val !== null;

			}

		} catch ( e ) {

			console.error( e );

		}

		return valueDefault;

	}

	static formatArrayAttribute ( val: string, defaultValue = [] ): Array<any> {

		let arr = defaultValue;

		try {

			if ( val !== 'string' || !JSON.parse( val ) ) throw new Error( 'Formatted -> formatArrayAttribute :: invalid value format' );

			let arr = JSON.parse( val );

			if ( !( arr instanceof Array ) ) throw new Error( 'Formatted -> formatArrayAttribute :: invalid value format' );

		} catch ( e ) {

			console.error( e );

		}

		return arr;

	}

    static formatValues ( val: string, valueDefault: string = '24px' ): string {

		let currentValue = val;

		if ( !val ) currentValue = valueDefault;

        if ( typeof currentValue === 'string' ) {

			if ( [ 'auto', 'inherit' ].includes( currentValue ) ) return currentValue;

			if ( parseInt( currentValue ).toString() === currentValue ) return `${ currentValue }px`;

			const size = Size.parseSize( currentValue );

			if ( !size ) return valueDefault;

			return `${ size.value }${ size.unit }`;

        }
    
        return `${ currentValue }px`;

    }

};
