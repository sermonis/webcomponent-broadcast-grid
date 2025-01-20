export class ColorParser {

    static parse( color: string ): any {

        if ( this.prototype.isHex( color ) ) {

            return this.prototype.parseHex( color );
        
        } else if ( this.prototype.isRgb( color ) ) {

            return this.prototype.parseRgb( color );
        
        } else if ( this.prototype.isHsl( color ) ) {
            
            return this.prototype.parseHsl( color );

        } else {
            
            throw new Error( 'Unsupported color format' );
        }

    }

    isHex( color: string ): boolean {

        return /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color);
    
    }

    parseHex( color: string ): any {

        let hex = color.replace( '#', '' );
        let alpha = 255;

        if (hex.length === 3) {

            hex = hex.split('').map(x => x + x).join('');

        } else if (hex.length === 4) {

            hex = hex.split('').map(x => x + x).join('');
            alpha = parseInt(hex.slice(6, 8), 16);

        } else if (hex.length === 8) {

            alpha = parseInt(hex.slice(6, 8), 16);

        }

        let bigint = parseInt(hex.slice(0, 6), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        return {

            r, g, b, alpha, format: 'hex'

        };

    }

    isRgb( color: string ): boolean {

        return /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(\d*(?:\.\d+)?)\s*)?\)$/.test(color);

    }

    parseRgb( color: string ): any {

        let match = color.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(\d*(?:\.\d+)?)\s*)?\)$/);

		if ( match ) {

			let r = parseInt(match[1], 10);
			let g = parseInt(match[2], 10);
			let b = parseInt(match[3], 10);
			let alpha = match[5] ? parseFloat(match[5]) : 1;

			return {

				r, g, b, alpha, format: 'rgb'

			};

		}

		return null;

    }

    isHsl( color: string ): boolean {

        return /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(,\s*(\d*(?:\.\d+)?)\s*)?\)$/.test(color);

    }

    parseHsl( color: string ): any {

        let match = color.match(/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(,\s*(\d*(?:\.\d+)?)\s*)?\)$/);

		if ( match ) {

			let h = parseInt(match[1], 10);
			let s = parseInt(match[2], 10);
			let l = parseInt(match[3], 10);
			let alpha = match[5] ? parseFloat(match[5]) : 1;

			return {

				h, s, l, alpha, format: 'hsl'

			};

		}

		return null;

    }

}
