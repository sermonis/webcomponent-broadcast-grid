import { AnimationSection } from './section';
import { PropObserver } from '../prop-observer';

interface IAnimation {

	timeline?: Set<AnimationSection>;

	totalTime?: PropObserver;

};

export class Animation implements IAnimation {

	timeline!: Set<AnimationSection>;

	totalTime!: PropObserver;

	constructor() {

		this.timeline = new Set();
		this.totalTime = new PropObserver();

	}

	private countTotalTime(): void {

		this.totalTime = [ ...this.timeline ].reduce( ( prev: number, curr: AnimationSection ): number => { 
			
			return Math.max( prev, curr.offset + curr.duration );
		
		}, 0 );

	}

	addState( section: AnimationSection ): this {

		if ( !( section instanceof AnimationSection ) ) {

			throw new Error( 'Animation -> addState :: invalid animation state' );

		}

		this.timeline.add( section );

		this.totalTime.subscribe( section.animate );

		this.countTotalTime();

		return this;

	}

	removeState( section: AnimationSection ): this {

		if ( !( section instanceof AnimationSection ) ) {

			throw new Error( 'Animation -> removeState :: invalid animation state' );

		}

		this.timeline.delete( section );

		this.totalTime.unsubscribe( section.animate );

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
