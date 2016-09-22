/// <reference path="Data/model.ts" />
/// <reference path="Display/Component.ts" />
/// <reference path="Display/ProjectItem.ts" />
/// <reference path="Controller/ListView.ts" />
/// <reference path="Controller/ProjectView.ts" />

var model:Model = new Model();

var contentView:Component = new Component(<HTMLElement>document.querySelector(".content"));

//views
var list:ListView = new ListView();
list.setModel(model);
list.addEventListener("project_clicked", function(e:iEvent){
	detail.setData(e.data);
	detail.show();
	contentView.addChild(detail);
	list.hide();
});
contentView.addChild(list);

var detail:ProjectView = new ProjectView();
detail.addEventListener("goback",function(){
	detail.hide();
	list.show();
});




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

