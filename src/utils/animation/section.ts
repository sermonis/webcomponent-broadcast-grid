import { ISectionOptions } from '../../@types/animation.types';

interface IAnimationSection {

	callback: Function;

	offset: number;
	duration: number;

};

// type TAnimationFuction = ( : number ) => boolean;

export class AnimationSection implements IAnimationSection {

	callback!: Function;

	offset!: number;
	duration!: number;

	constructor(
		
		callback: Function,
		options: ISectionOptions,
	
	) {

		try {

			if ( !( callback instanceof Function ) ) {

				throw new Error( 'State -> constructor :: invalid callback. Expected "Function"' );

			}
			
			this.callback = callback;

			/**
			 * @todo make parsers for durations
			 */
			this.offset = options?.offset || 0;
			this.duration = options?.duration || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};
