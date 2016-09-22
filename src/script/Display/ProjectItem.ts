/// <reference path="../Data/Model.ts" />

class ProjectItem extends Component {
	
	public data:iProjectData;
	private img:HTMLImageElement;

	constructor() {
		super();
		this.create({
			type:"div",
			ref:"container",
			sclass:["project-item"],
			children:[{
				type:"img",
				ref:"img"
			},{
				type:"div",
				ref:"overlay",
				sclass:["overlay"],
				children:[{
					type:"div",
					sclass:["title"],
					ref:"text"
				}]
			}]
		});

		this.img = <HTMLImageElement> this.getRef("img");

		this.routeEvents();
	}

	setData(data:iProjectData){
		this.data = data;
		if(data.image){
			console.log("data", data,data.image);
			this.img.src = data.image;
		}
		this.setText(data.title, "text");
	}
}