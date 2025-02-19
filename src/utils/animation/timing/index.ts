interface IAnimationTimingMethod {

    [ key: string ]: Function;

};

const methods: IAnimationTimingMethod = {

	'linear': ( timeFraction: number ) => {
  
		return timeFraction;
		
	},

	'ease-in': ( timeFraction: number ) => {
  
		return timeFraction ** 2;

	},

	'ease-out': ( timeFraction: number ) => {
  
		return timeFraction * ( 2 - timeFraction );

	},

	'ease-in-out': ( timeFraction: number ) => {
  
		return timeFraction < 0.5 ? 2 * timeFraction * timeFraction : -1 + (4 - 2 * timeFraction) * timeFraction;

	},

};

export class Timing {

	static getTiming( method: string | Function ): Function {

		if ( typeof method === 'string' ) {

			const methodName: string = method.trim().toLowerCase();

			if ( !methods[ methodName ] ) throw new Error( `Timing -> getTiming :: can not find timing function named "${ methodName }"` );

			return methods[ methodName ];
				
		}

		if ( !( method instanceof Function ) ) {

			throw new Error( 'Timing -> getTiming :: timing parameter is not a function' );

		}

		return method;

	}

};
