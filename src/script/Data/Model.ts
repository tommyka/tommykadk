/// <reference path="../Event/EventDispatcher.ts" />

class Model extends EventDispatcher {
	

	public data:iProjectData[];

	constructor() {
		super();
	}

	load(url:string){
		var self = this;

		var req = new XMLHttpRequest();
		req.open("GET", url || "boat.json", true);
		req.onload = function(e) {
			var data = JSON.parse(req.responseText);
			self.data = data;

			self.dispatchEvent({ type: "complete", data: data });
		}
		req.onerror = function() {
			self.dispatchEvent({type:"error", data:"Error loading data"});
		}

		req.send();
	}

	public getProject(id:string):iProjectData{
		for (var i = 0; i < this.data.length; i++) {
			if(this.data[i].id == id){
				return this.data[i];
			}
		}

		return null;
	}
}


interface iProjectData{
	id:string,
	title:string,
	description:string,
	image?:string,
	url?:string,
	gallery?:string[]
}