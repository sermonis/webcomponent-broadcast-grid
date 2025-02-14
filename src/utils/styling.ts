export class Styling {

    static launch( el: HTMLElement, styles: CSSStyleDeclaration ): void {

		if ( !( el instanceof HTMLElement ) ) {
			
			throw new Error( 'Styling -> launch :: invalid HTML Element' );

		}

        // Устанавливаем новые стили напрямую
        for ( const property of Object.keys( styles ) ) {

            if ( property in el.style ) {

                ( el.style as any )[ property ] = styles[ property as any ];

            }

        }

    }

};
