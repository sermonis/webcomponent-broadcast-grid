import { AnimationState } from './state';

interface IAnimation {

	timeline?: Set<AnimationState>;

	totalTime?: number;

};

export class Animation implements IAnimation {

	timeline!: Set<AnimationState>;

	totalTime!: number;

	constructor() {

		this.timeline = new Set();
		this.totalTime = 0;

	}

	private countTotalTime(): void {

		this.totalTime = [ ...this.timeline ].reduce( ( prev: number, curr: AnimationState ): number => { 
			
			return Math.max( prev, curr.offset + curr.duration );
		
		}, 0 );

	}

	addState( state: AnimationState ): this {

		if ( !( state instanceof AnimationState ) ) {

			throw new Error( 'Animation -> addState :: invalid animation state' );

		}

		this.timeline.add( state );

		this.countTotalTime();

		return this;

	}

	removeState( state: AnimationState ): this {

		if ( !( state instanceof AnimationState ) ) {

			throw new Error( 'Animation -> removeState :: invalid animation state' );

		}

		this.timeline.delete( state );

		this.countTotalTime();

		return this;

	}

	play( { timing, draw, duration } ): void {

		const that = this;

		let start = performance.now();
	  
		requestAnimationFrame( function animate( time ) {

			// timeFraction изменяется от 0 до 1
			let timeFraction: number = (time - start) / that.totalTime;
		  
			if (timeFraction > 1) timeFraction = 1;
		
			// вычисление текущего состояния анимации
			let progress = timing(timeFraction);
		
			draw(progress); // отрисовать её
		
			if (timeFraction < 1) {

				requestAnimationFrame(animate);
			
			}
		
		});
	
	}

};
