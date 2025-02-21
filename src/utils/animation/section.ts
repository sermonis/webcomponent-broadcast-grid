import { ISectionOptions } from '../../@types/animation.types';
import { Timing } from './timing';

type TAnimationFuction = ( timing: number ) => void;

interface IAnimationSection {

	callback: Function;

	offset: number;
	duration: number;
	timing: Function;

	animate: TAnimationFuction;

};

export class AnimationSection implements IAnimationSection {

	callback!: Function;

	offset!: number;
	duration!: number;
	timing!: Function;

	constructor(
		
		callback: Function,
		options: ISectionOptions,
	
	) {

		try {

			if ( !( callback instanceof Function ) ) {

				throw new Error( 'Section -> constructor :: invalid callback. Expected "Function"' );

			}
			
			this.callback = callback;

			/**
			 * @todo make parsers for durations
			 */
			this.offset = options?.offset || 0;
			this.duration = options?.duration || 0;
			this.timing = Timing.getTiming( options?.timing || 'linear' );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private sectionTime( timing: number ): number | null {

		if ( timing >= this.offset && timing <= ( this.offset + this.duration ) ) {

			return timing - this.offset;

		}

		return null;
	
	}

	public animate( timing: number ): void {

		const sectionTime: number | null = this.sectionTime( timing );

		if ( sectionTime !== null ) {

			const progress = sectionTime / this.duration;

			this.callback( {
						
				timing,
				progress,
					
			} );

		}

		// sectionTime !== null && this.callback( {
			
		// 	timing,
		// 	progress,
		
		// } );

	}

};
