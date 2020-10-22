import ListView from './Controller/ListView';
import ProjectView from './Controller/ProjectView';
import Router from './Controller/Router';
import Model from './Data/Model';
import Component from './Display/Component';
import { iEvent } from './Event/EventDispatcher';

var model:Model = new Model();
model.addEventListener("complete", function(){
	router.init();
});

var contentView:Component = new Component(<HTMLElement>document.querySelector(".content"));

var router:Router = new Router();

//views
var list:ListView = new ListView();
list.setModel(model);
list.addEventListener("project_clicked", function(e:iEvent){
	router.setURL("project/"+ e.data.id);
});
contentView.addChild(list);
router.addPage(list, "", true);
	
var detail:ProjectView = new ProjectView();
detail.addEventListener("goback",function(){
	router.setURL("");

});
detail.setModel(model);
detail.hide();
contentView.addChild(detail);
router.addPage(detail,"project");

model.load("content/data.json");


