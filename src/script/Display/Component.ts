/// <reference path="../Event/EventDispatcher.ts" />
class Component extends EventDispatcher {
	
	private children:HTMLElement[] = [];
	private refs:{[name:string]: HTMLElement} = {}
	public element:HTMLElement = null;

	constructor() {
		super();
	}

	public create(structure:iStructure){
		this.element = this.render(structure);
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

		return element;
	}

	protected setText(text:string, ref?:string){
		var target:HTMLElement = ref ? this.getRef(ref) : this.element;
		target.textContent = text;
	};

	protected getRef(name:string):HTMLElement{
		return this.refs[name];
	}
}

interface iStructure{
	type:string;
	ref?:string;
	id?:string;
	sclass?:string[];
	children?:string|iStructure[];
	text?:string;
}