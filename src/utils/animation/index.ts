import { AnimationSection } from './section';
import { PropObserver } from '../prop-observer';

export * from './section';

interface IAnimation {

	timeline?: Set<AnimationSection>;
	totalTime?: number;
	currentTime?: PropObserver;

};

export class Animation implements IAnimation {

	timeline!: Set<AnimationSection>;
	totalTime!: number;
	currentTime!: PropObserver;

	constructor() {

		this.timeline = new Set();
		this.totalTime = 0;
		this.currentTime = new PropObserver();

	}

	private countTotalTime(): void {

		this.totalTime = [ ...this.timeline ].reduce( ( prev: number, curr: AnimationSection ): number => { 
			
			return Math.max( prev, curr.offset + curr.duration );
		
		}, 0 );

	}

	addSection( section: AnimationSection ): this {

		if ( !( section instanceof AnimationSection ) ) {

			throw new Error( 'Animation -> addState :: invalid animation state' );

		}

		this.timeline.add( section );

		this.currentTime.subscribe( section.animate );

		this.countTotalTime();

		return this;

	}

	removeSection( section: AnimationSection ): this {

		if ( !( section instanceof AnimationSection ) ) {

			throw new Error( 'Animation -> removeState :: invalid animation state' );

		}

		this.timeline.delete( section );

		this.currentTime.unsubscribe( section.animate );

		this.countTotalTime();

		return this;

	}

	play(): void {

		const that = this;

		let start = performance.now();
	  
		requestAnimationFrame( function animate( time ) {

			// timeFraction изменяется от 0 до 1
			let timeFraction: number = (time - start) / that.totalTime;
		  
			if ( timeFraction > 1 ) timeFraction = 1;

			that.currentTime.value = time - start;
		
			// вычисление текущего состояния анимации
			// let progress = timing(timeFraction);
		
			if (timeFraction < 1) {

				requestAnimationFrame(animate);
			
			}
		
		});
	
	}

};
