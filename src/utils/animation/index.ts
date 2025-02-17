import { AnimationState } from './state';

interface IAnimation {

	timeline?: Set<AnimationState>;

};

export class Animation implements IAnimation {

	timeline!: Set<AnimationState>;

	constructor() {

		this.timeline = new Set();

	}

	addState( state: AnimationState ): this {

		if ( !( state instanceof AnimationState ) ) {

			throw new Error( 'Animation -> addState :: invalid animation state' );

		}

		this.timeline.add( state );

		return this;

	}

	removeState( state: AnimationState ): this {

		if ( !( state instanceof AnimationState ) ) {

			throw new Error( 'Animation -> removeState :: invalid animation state' );

		}

		this.timeline.delete( state );

		return this;

	}

};
