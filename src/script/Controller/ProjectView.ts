/// <reference path="../Display/Image.ts" />
class ProjectView extends Page {
	
	private data:iProjectData;

	constructor() {
		super();
		var s:iStructure = {
			type:"div",
			sclass:["project-content"],
			children:[{
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
				ref:"content"
			}]
		};
		this.create(s);
	}

	public setData(data:iProjectData){
		this.data = data;
		this.setText(data.title,"title");
		this.setText(data.description,"description");
		var link:HTMLAnchorElement = <HTMLAnchorElement>this.getRef("link");
		link.href = data.url;
		link.target = "_blank";

		var container:HTMLElement = this.getRef("content");

		for (var i = 0; i < data.gallery.length; i++) {
			var gi = data.gallery[i];
			var img = new ImageComp();
			img.src = gi;

			container.appendChild(img.element);

		}


		console.log("new setData", data);
	}
}