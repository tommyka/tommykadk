/// <reference path="Data/model.ts" />
/// <reference path="Display/Component.ts" />
/// <reference path="Display/ProjectItem.ts" />
/// <reference path="Controller/ListView.ts" />
/// <reference path="Controller/ProjectView.ts" />
/// <reference path="Controller/Router.ts" />

var model:Model = new Model();

var contentView:Component = new Component(<HTMLElement>document.querySelector(".content"));

var router:Router = new Router();

//views
var list:ListView = new ListView();
list.setModel(model);
list.addEventListener("project_clicked", function(e:iEvent){
	router.setURL("project/"+ e.data.title);
	/*detail.setData(e.data);
	detail.show();
	contentView.addChild(detail);
	list.hide();*/
});
contentView.addChild(list);
router.addPage(list, "", true);

var detail:ProjectView = new ProjectView();
detail.addEventListener("goback",function(){
	router.setURL("");
	/*detail.hide();
	list.show();*/
});
detail.setModel(model);
detail.hide();
contentView.addChild(detail);
router.addPage(detail,"project");




model.load("content/data.json");
/*
model.addEventListener("complete", function(){
	console.log("data loaded", model.data);

	for (var i = 0; i < model.data.length; i++) {
		console.log("create");
		var d:iProjectData = model.data[i];
		var img:ProjectItem = new ProjectItem();
		img.setData(d);

		contentView.addChild(img);
	}

});*/

