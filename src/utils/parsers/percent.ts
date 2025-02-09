export class Percent {

    static parsePercent( value: string | number = 0): number | null {

        const strValue = String(value).trim();
    
        const numValue = parseFloat(strValue);
        
        if (isNaN(numValue)) return null;
    
        if (numValue < 0 || numValue > 100) return null;
    

        const regex = /^(\d+(\.\d+)?)%?$/;
        
        if ( regex.test(strValue) ) return numValue;

        if ( numValue >= 0 && numValue <= 1 ) return numValue * 100;

        return null;

    }

};
