import { type IFilter } from '../@types/filter.types';
import {
    
    type ISize,

    Percent,
    Size,

} from './parsers';

interface IFilterMethod {

    [ key: string ]: Function;

};

const methods: IFilterMethod = {

    'grayscale': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> grayscale :: invalid value format` );

        }
        
        return `grayscale(${ parsedValue }%)`; 

    },

    'blur': ( value: string ) => {

        const parsedValue: ISize | null = Size.parseSize( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> blur :: invalid value format` );

        }
        
        return `blur(${ parsedValue.value }${ parsedValue.unit })`; 

    },

    'contrast': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> contrast :: invalid value format` );

        }
        
        return `contrast(${ parsedValue }%)`; 

    },

    'invert': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> invert :: invalid value format` );

        }
        
        return `invert(${ parsedValue }%)`; 

    },

    'sepia': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> sepia :: invalid value format` );

        }
        
        return `sepia(${ parsedValue }%)`; 

    },

    'opacity': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> opacity :: invalid value format` );

        }
        
        return `opacity(${ parsedValue }%)`; 

    },

    'saturate': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> saturate :: invalid value format` );

        }
        
        return `saturate(${ parsedValue }%)`; 

    },

    'brightness': ( value: string | number ) => {

        const parsedValue: number | null = Percent.parsePercent( value );
      
        if ( parsedValue === null ) {

            throw new Error( `Filter -> brightness :: invalid value format` );

        }
        
        return `brightness(${ parsedValue }%)`; 

    },

    /**
     * @todo drop-shadow, hue-rotate, url
     */

};

export class Filter {

    static launch( el: HTMLElement, filterList: Array<IFilter> ): void {

        if ( !( el instanceof HTMLElement ) ) {
            
            throw new Error( 'Filter -> launch :: invalid HTML Element' );

        }

        if ( !( filterList instanceof Array ) ) {
            
            throw new Error( 'Filter -> launch :: invalid filters type. Expected "Array"' );

        }

        const filters: string = filterList.reduce( ( prev: Array<string>, curr: IFilter ): Array<string> => {

            if ( !curr.type || !methods[ curr.type ] ) {
                
                throw new Error( 'Filter -> launch :: invalid method type' );

            }

            prev.push( methods[ curr.type ]( curr.value ) );

            return prev;

        }, [] ).join( ' ' );

        el.style.filter = filters;

    }

};
