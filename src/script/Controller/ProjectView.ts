/// <reference path="../Display/Image.ts" />
class ProjectView extends Page {
	
	private data:iProjectData;
	private images:ImageComp[] = [];
	private comps:ImageComp[] = [];

	constructor() {
		super();
		var s:iStructure = {
			type:"div",
			sclass:["project-content"],
			children:[{
				type:"div",
				sclass:["back"],
				ref:"back",
				text:"< Gå tilbake"
			},{
				type:"div",
				sclass:["info-box"],
				children:[{
					type:"h2",
					ref:"title",
				},{
					type:"div",
					sclass:["description"],
					ref:"description",
				},{
					type:"div",
					sclass:["link"],
					children:[{
						type:"a",
						ref:"link",
						text:"Gå til prosjekt",
					}]
				}]
			},{
				type:"div",
				sclass:["images"],
				ref:"content"
			}]
		};
		this.create(s);
		var self = this;
		this.getRef("back").addEventListener("click",function(){
			self.dispatchEvent({type: "goback"});
		});
	}

	private getComp():ImageComp{
		if(this.comps.length > 0){
			return this.comps.pop();
		}else{
			return new ImageComp();
		}
	}
	private releashComp(comp:ImageComp){
		if(comp){
			if(comp.element.parentNode){
				comp.element.parentNode.removeChild(comp.element);
			}
			this.comps.push(comp);
		}
	}

	public setData(data:iProjectData){
		this.data = data;
		this.setText(data.title,"title");
		this.setText(data.description,"description");
		var link:HTMLAnchorElement = <HTMLAnchorElement>this.getRef("link");
		link.href = data.url;
		link.target = "_blank";

		var container:HTMLElement = this.getRef("content");

		while(this.images.length != 0){
			this.releashComp(this.images.pop());
		}

		for (var i = 0; i < data.gallery.length; i++) {
			var gi = data.gallery[i];
			var img = this.getComp();
			img.src = gi;
			this.images.push(img);

			container.appendChild(img.element);

		}


		console.log("new setData", data);
	}
}