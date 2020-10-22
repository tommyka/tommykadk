import Component from "./Component";

class Page extends Component {
	
	constructor() {
		super();
	}

	public show(path?:string){
		if(this.element){
			this.element.style.display = "";
		}
	}

	public hide(){
		if(this.element){
			this.element.style.display = "none";
		}
	}
}

export default Page;