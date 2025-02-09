import { type ITransformation } from '../@types/transform.types';

interface ITransformMethod {

	[ key: string ]: Function;

};

const methods: ITransformMethod = {

	'rotate': ( angle: number ) => `rotate(${ angle }deg)`,
	'translate': ( coords: { x: number, y: number } ) => `translate(${ coords.x }px, ${ coords.y }px)`,
	'translate-x': ( x: number ) => `translateX(${ x }px)`,
	'translate-y': ( y: number ) => `translateY(${ y }px)`,
	'scale': ( size: { a: number, b?: number } ) => `scale(${ size.a } ${ size.b !== undefined ? `, ${ size.b }` : '' })`,
	'scaleX': ( size: number ) => `scaleX(${ size })`,
	'scaleY': ( size: number ) => `scaleY(${ size })`,
	'skew': ( angle: { angleX: number, angleY: number } ) => `skew(${ angle.angleX }deg, ${ angle.angleY }deg )`,
	'skewX': ( angle: number ) => `skewX(${ angle }deg )`,
	'skewY': ( angle: number ) => `skewY(${ angle }deg )`,

};

export class Transform {

	static launch( el: HTMLElement, transformations: Array<ITransformation> ): void {

		if ( !( el instanceof HTMLElement ) ) {
			
			throw new Error( 'Transform -> launch :: invalid HTML Element' );

		}

		if ( !( transformations instanceof Array ) ) {
			
			throw new Error( 'Transform -> launch :: invalid transformations type. Expected "Array"' );

		}

		const transforms: string = transformations.reduce( ( prev: Array<string>, curr: ITransformation ): Array<string> => {

			if ( !curr.type || !methods[ curr.type ] ) {
				
				throw new Error( 'Transform -> launch :: invalid method type' );

			}

			prev.push( methods[ curr.type ]( curr.value ) );

			return prev;

		}, [] ).join( ' ' );

		el.style.transform = transforms;

	}

};
