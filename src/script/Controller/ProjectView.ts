/// <reference path="../Display/Image.ts" />
class ProjectView extends Page {
	
	private data:iProjectData;
	private images:ImageComp[] = [];
	private comps:ImageComp[] = [];
	private model:Model;

	constructor() {
		super();
		var self = this;
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
				sclass:["info-box", "fadeinmove", "animdelay"],
				ref:"box",
				children:[{
					type: "div",
					sclass: ["minimize"],
					text: "x",
					click:function(e:any){
						self.toggleMinimize();
					}
				},{
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
				sclass:["images", "fadein"],
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

	private toggleMinimize(){
		var box:HTMLElement = this.getRef("box");
		if(box.classList.contains("minimized")){
			box.classList.remove("minimized");
		}else{
			box.classList.add("minimized");
		}
	}

	public show(path?:string){
		super.show(path);

		if(path && this.model){
			var data = this.model.getProject(path);
			if(data){
				this.setData(data);
			}
		}
	}

	public setModel(model:Model){
		this.model = model;
	}

	public setData(data:iProjectData){
		this.data = data;
		this.setText(data.title,"title");
		this.setText(data.description,"description");
		var link:HTMLAnchorElement = <HTMLAnchorElement>this.getRef("link");
		link.href = data.url;
		link.target = "_blank";
		link.style.display = data.url ? "inline" : "none";

		var container:HTMLElement = this.getRef("content");

		while(this.images.length != 0){
			this.releashComp(this.images.pop());
		}

		while (container.childNodes.length != 0){
			container.removeChild(container.childNodes[0]);
		}

		for (var i = 0; i < data.gallery.length; i++) {
			var gi = data.gallery[i];

			if(gi.indexOf("vimeo") != -1){
				//Fast solution to playing videos.
				//TODO: Rewrite with own vimeo object/class

				var wrapper:HTMLElement = document.createElement("div");
				wrapper.classList.add("embedvideo");
				container.appendChild(wrapper);

				var path = gi.replace(/(vimeo.com)/g, "player.$1/video");
				var vimeo:HTMLIFrameElement = document.createElement("iframe");
				vimeo.width = 640 + "";
				vimeo.height = 360 + "";
				vimeo.src = path;
				wrapper.appendChild(vimeo);

			}else{
				var img = this.getComp();
				img.src = gi;
				this.images.push(img);

				container.appendChild(img.element);
			}
		}
	}
}