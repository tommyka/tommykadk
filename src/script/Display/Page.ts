class Page extends Component {
	
	constructor() {
		super();
	}

	public show(path?:string){
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