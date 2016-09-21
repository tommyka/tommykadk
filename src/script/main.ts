/// <reference path="Data/model.ts" />
/// <reference path="Display/Component.ts" />
/// <reference path="Display/ProjectItem.ts" />

var model:Model = new Model();
model.load("content/data.json");
model.addEventListener("complete", function(){
	console.log("data loaded", model.data);

	for (var i = 0; i < model.data.length; i++) {
		console.log("create");
		var d:iProjectData = model.data[i];
		var img:ProjectItem = new ProjectItem();
		img.setData(d);

		document.body.appendChild(img.element);
	}

});

