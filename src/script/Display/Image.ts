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
		this.img.addEventListener("complete", function(e){
		});
	}

	public set src(value:string){
		this.img.src = value;
	}

	public get src():string{
		return this.img.src;
	}

}