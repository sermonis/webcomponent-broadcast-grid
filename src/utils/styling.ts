import { type IOptions } from '../@types/options.types';

export class Styling {

    static run( el: HTMLElement, styles: IOptions ): void {

		if ( !( el instanceof HTMLElement ) ) {
			
			throw new Error( 'Transform -> launch :: invalid HTML Element' );

		}

        Object.assign( el.style, window.getComputedStyle( el ), styles );

    }

};
