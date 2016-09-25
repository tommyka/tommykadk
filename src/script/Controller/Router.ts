/// <reference path="../Display/Page.ts" />
/// <reference path="../Event/EventDispatcher.ts" />
class Router extends EventDispatcher {
	
	private pages:{[route:string]:Page} = {};
	private currentPage:Page;

	constructor() {
		super();
		var self = this;
		window.addEventListener("hashchange", function(e){
			console.log(e);
			self.changePage(location.hash.substr(1));
		});
	}

	private changePage(path:string){
		path = path == "" ? "-empty-" : path;
		var split = path.split("/");
		console.log(path, split);

		var newpage =this.pages[split[0]];

		if(newpage){
			if(this.currentPage){
				this.currentPage.hide();
			}

			newpage.show(split[1]);
			this.currentPage = newpage;
		}
	}

	public addPage(page:Page, route:string, current:boolean = false){
		route = route == "" ? "-empty-" : route;
		this.pages[route] = page;

		if(current){
			this.currentPage = page;
		}
	}

	public setURL(url:string){
		location.hash = url;
	}
}