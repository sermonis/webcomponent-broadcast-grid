import { IStateOptions } from '../../@types/animation.types';

interface IAnimationState {

	el: HTMLElement;
	callback: Function;

	offset: number;
	duration: number;

};

export class AnimationState implements IAnimationState {

	el!: HTMLElement;
	callback!: Function;

	offset!: number;
	duration!: number;

	constructor(
		
		el: HTMLElement,
		callback: Function,
		options: IStateOptions,
	
	) {

		try {

			if ( !( el instanceof HTMLElement ) ) {

				throw new Error( 'State -> constructor :: invalid element' );

			}

			if ( !( callback instanceof Function ) ) {

				throw new Error( 'State -> constructor :: invalid callback. Expected "Function"' );

			}

			this.el = el;

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
