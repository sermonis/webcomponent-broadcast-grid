export interface ISize {

	value: number;
	unit: string;

};

export class Size {

	static parseSize( sizeString: string = '0px' ): ISize | null {

		const sizeRegex = /^(-?\d+(\.\d+)?)(px|%|em|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc)$/;
		const match = sizeString.match(sizeRegex);

		if (match) {

			const value = parseFloat( match[1] );
			const unit = match[3];

			return { value, unit };
		
		} 

		return null;

	}

};
