import Page from "../Display/Page";
import EventDispatcher from "../Event/EventDispatcher";

class Router extends EventDispatcher {
	
	private pages:{[route:string]:Page} = {};
	private currentPage:Page;

	constructor() {
		super();
		var self = this;
		window.addEventListener("hashchange", function(e){
			console.log(e);
			self.readURL();
		});
	}

	public init(){
		if(location.hash != ''){
			this.readURL();
		}
	}


	private changePage(path:string){
		path = path == "" ? "-empty-" : path;
		var split = path.split("/");

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
	private readURL(){

		this.changePage(decodeURIComponent(location.hash.substr(1)));
	}
}

export default Router;