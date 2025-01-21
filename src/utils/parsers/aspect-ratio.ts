export interface IAspectRatio {

	w: number;
	h: number;

};

export class AspectRatio {

	static parse( aspectRatio: string | null = '16/9' ): IAspectRatio | null {

		let w: number = 16, h: number = 9;

		if ( !aspectRatio ) {

			return null;

		}

		const parts: Array<any> = aspectRatio.trim().split(/\s*\/\s*|\s*:\s*/);
		
		if ( parts.length !== 2 ) {

			return null;

		}

		const width: number = parseFloat( parts[0] );
		const height: number = parseFloat( parts[1] );

		if ( isNaN( width ) || isNaN( height ) || width <= 0 || height <= 0 ) {

			return null;
		
		}

		w = width;
		h = height;

		return { w, h };

	}

};
