import Component from "./Component";

class ImageComp extends Component {
	
	public img:HTMLImageElement;

	constructor() {
		super();
		this.create({
			type:"div",
			sclass:["image"],
			ref:"container",
			children:[{
				type:"img",
				ref:"img"
			}]
		});

		var self = this;

		this.img = <HTMLImageElement>this.getRef("img");
		
		this.img.addEventListener("load", function(e){
			console.log("image loaded", self.img.naturalHeight,self.img.naturalWidth,self.img.naturalHeight > self.img.naturalWidth)
			if(self.img.naturalHeight > self.img.naturalWidth){
				self.img.classList.add("portrait");
			}else{
				self.img.classList.remove("portrait");
			}
		});
	}

	public set src(value:string){
		this.img.src = value;
	}

	public get src():string{
		return this.img.src;
	}
}

export default ImageComp;