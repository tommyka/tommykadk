import EventDispatcher from "../Event/EventDispatcher";

export interface iStructure{
	type:string;
	ref?:string;
	id?:string;
	sclass?:string[];
	children?:string|iStructure[];
	text?:string;
	click?:any;
	attr?:Object;
}
class Component extends EventDispatcher {
	
	private children:Component[] = [];
	private refs:{[name:string]: HTMLElement} = {}
	public element:HTMLElement = null;

	constructor(target?:HTMLElement) {
		super();
		if(target){
			this.element = target;
		}else{
			this.create({
				type:"div"
			});
		}
	}

	public create(structure:iStructure){
		this.element = this.render(structure);
	}

	protected routeEvents(){
		var self = this;
		this.element.addEventListener("click", function(e){
			self.dispatchEvent({type:"click", data:e});
		});
	}

	private render(stuc:iStructure):HTMLElement{
		var element:HTMLElement = document.createElement(stuc.type);

		if(stuc.sclass){
			for (var i = 0; i < stuc.sclass.length; i++) {
				element.classList.add(stuc.sclass[i]);
			}
		}
		if(stuc.id){
			element.id = stuc.id;
		}
		if(stuc.ref){
			this.refs[stuc.ref] = element;
		}
		if(stuc.text){
			element.textContent = stuc.text;
		}
		if(stuc.children){
			for (var j = 0; j < stuc.children.length; j++) {
				var c:any = stuc.children[i];
				if(typeof c == "string"){
					element.appendChild(document.createTextNode(c));
				}else{
					element.appendChild(this.render(<iStructure>stuc.children[j]));
				}
			}
		}
		if(stuc.click){
			element.addEventListener("click", stuc.click);
		}
		/*
		if(stuc.attr){
			for (var key in stuc.attr) {
				var tkey:any = key;
				this.element.setAttribute(key, stuc.attr[tkey]);
			}
		}*/

		return element;
	}

	protected setText(text:string, ref?:string){
		var target:HTMLElement = ref ? this.getRef(ref) : this.element;
		if(target){
			target.textContent = text;
		}else{
			console.log("ref not found", ref);
		}
	};

	protected getRef(name:string):HTMLElement{
		return this.refs[name];
	}

	public addChild(child:Component){
		console.log("element", child);

		this.children.push(child);
		this.element.appendChild(child.element);
	}

	public rmeoveChild(child:Component){
		for (var i = 0; i < this.children.length; i++) {
			if(this.children[i] == child){
				this.children.splice(i, 1);
				this.element.removeChild(child.element);
				break;
			}
		}
	}
}

export default Component;

