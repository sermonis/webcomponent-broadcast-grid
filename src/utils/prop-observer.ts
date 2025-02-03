interface IPropObserver {

    // _value: any;

};

export class PropObserver implements IPropObserver {

    private subscribers!: Set<Function>;
    private _value!: any;

    constructor ( valueDefault: any = null ) {

        this._value = valueDefault;

        this.subscribers = new Set();

    }

    subscribe( handler: Function ) {

        try {

            if ( !( handler instanceof Function ) ) throw new Error( `Observer -> subscribe :: invalid handler type. Expected "Function"` );

            this.subscribers.add( handler );

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

    unsubscribe( handler: Function ) {

        try {

            if ( !( handler instanceof Function ) ) throw new Error( `Observer -> subscribe :: invalid handler type. Expected "Function"` );

            this.subscribers.delete( handler );

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

    private emit () {

        this.subscribers.forEach( ( handler: any ) => {

            handler();

        } );

    }

    get value () {

        return this._value;

    }

    set value ( val: any ) {

        this._value = val;

        this.emit();

    }

};
