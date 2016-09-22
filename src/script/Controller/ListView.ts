/// <reference path="../Display/ProjectItem.ts" />
/// <reference path="../Display/Page.ts" />
/// <reference path="../Data/Model.ts" />
class ListView extends Page {
	
	private model:Model;

	constructor() {
		super();
		this.create({
			type:"div",
			sclass: ["list-view"],
			ref:"list"
		});
	}

	public setModel(m:Model){
		var self = this;
		this.model = m;
		this.model.addEventListener("complete", function(){
			self.model_updated();
		});
	}

	private model_updated(){
		var self = this;

		for (var i = 0; i < this.model.data.length; i++) {
			var d = this.model.data[i];

			var item:ProjectItem = new ProjectItem();
			item.setData(d);
			item.addEventListener("click", function(e:any){
				console.log("item-click", e);
				self.handle_item_click(e);				
			});
			this.addChild(item);
		}
	}

	private handle_item_click(e:iEvent){
		this.dispatchEvent({type:"project_clicked", data: e.target.data})
	}
}