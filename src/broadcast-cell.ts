import './css/broadcast-cell.css';

interface IBroadcastCell {


};

export class BroadcastCell extends HTMLElement implements IBroadcastCell {

	private rendered: boolean = false;

	constructor() {

		super();

	}

	update() {

	}

	render() {

		this.className = 'broadcast-cell';

		this.rendered = true;

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {

	}

	static get observedAttributes() {

		return [



		];
	
	}

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};
