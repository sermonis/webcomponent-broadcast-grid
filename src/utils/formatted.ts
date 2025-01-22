import { Size } from './parsers/size.ts';
import { type IAspectRatio, AspectRatio } from './parsers/aspect-ratio.ts';

export class Formatted {

	static formatStringAttribute ( val: string | null, valueDefault: string | null = '' ): string {

		if ( typeof valueDefault !== 'string' ) {
			
			throw new Error( `Formatted -> formatStringAttribute :: invalid valueDefault. Expected "string" type, got "${ typeof valueDefault }"` );

		}

		if ( typeof val !== 'string' ) return valueDefault;

		return val;

	}

	static formatNumberAttribute ( val: string | null, valueDefault: number | null = 0 ): number {

		if ( typeof valueDefault !== 'number' ) {
			
			throw new Error( `Formatted -> formatNumberAttribute :: invalid valueDefault. Expected "number" type, got "${ typeof valueDefault }"` );

		}

		if ( val === null ) return valueDefault;

		if ( isNaN( +val ) ) return valueDefault;

		return +val;

	}

	static formatBooleanAttribute ( val: string | null, valueDefault: boolean | null = false ): boolean {

		const values: Array<string> = [ 'true', 'false' ];

		if ( typeof valueDefault !== 'boolean' ) {
			
			throw new Error( `Formatted -> formatNumberAttribute :: invalid valueDefault. Expected "boolean" type, got "${ typeof valueDefault }"` );

		}

		if ( typeof val === 'string' && values.includes( val ) ) return val === 'true';

		if ( typeof val === 'boolean' ) return val;

		if ( typeof val === 'string' || val === null ) {

			return val !== null;

		}

		return valueDefault;

	}

	static formatArrayAttribute ( val: string | null, defaultValue = [] ): Array<any> {

		let arr: Array<any> = defaultValue;

		if ( val !== 'string' || !JSON.parse( val ) ) {
			
			throw new Error( `Formatted -> formatArrayAttribute :: cannot parse val as JSON` );

		}

		arr = JSON.parse( val );

		if ( !( arr instanceof Array ) ) {
			
			throw new Error( 'Formatted -> formatArrayAttribute :: invalid value. Expected "array"' );

		}

		return arr;

	}

    static formatValues ( val: string | number | null, valueDefault: string = '24px' ): string {

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

	static formatAspectRatio ( val: string | null, valueDefault: string = '19/6' ): IAspectRatio {

		let aspectRatio: IAspectRatio | null = AspectRatio.parse( val );
		let defaultAspectRation: IAspectRatio | null = AspectRatio.parse( valueDefault );

		if ( typeof valueDefault !== 'string' || !defaultAspectRation ) {

			throw new Error( 'Formatted -> formatAspectRatio :: invalid valueDefault format' );

		}

		if ( !aspectRatio ) {

			aspectRatio = defaultAspectRation;

		}

		return aspectRatio;

	}

    static formatAvatarName ( name: string ): string {

		if ( typeof name !== 'string' ) {

			throw new Error( `Formatted -> formatAvatarName :: invalid name. Expected "string" type, got "${ typeof name }"` );

		}

        if (!!name) {
    
            const parts = name.trim().split(' ');
    
            if (parts.length > 1) {
    
                return [ 
                    
                    parts[0].trim().charAt(0), 
                    parts[1].trim().charAt(0),
                
                ].join('').toUpperCase();
    
            } else {
    
                return [ 
                    
                    parts[0].trim().charAt(0), 
                    parts[0].trim().charAt(1),
                
                ].join( '' ).toUpperCase();
    
            }
    
        }
    
        return '';
    
    }

};
