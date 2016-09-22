class Page extends Component {
	
	constructor() {
		super();
	}

	public show(){
		if(this.element){
			this.element.style.display = "block";
		}
	}

	public hide(){
		if(this.element){
			this.element.style.display = "none";
		}
	}
}