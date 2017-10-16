TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {

	// TodoList Router
	// ---------------
	//
	// Handle routes to show the active vs complete todo items

	TodoList.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'*filter': 'filterItems'
		}
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models

	TodoList.Controller = function() {
		this.todoList = new App.Todos.TodoList();
	};

	_.extend(TodoList.Controller.prototype, {

		//Start the app by showing the appropriate views
		//and fetching the list of todo items, if there are any

		start: function() {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);

			App.bindTo(this.todoList, 'reset ass remove', this.toggleFooter, this);
			this.todoList.fetch();
		},

		showHeader: function(todoList) {
			var header = new App.Layout.Header({
				collection: todoList
			});
			App.header.show(header);
		},

		showFooter: function(todoList) {
			App.main.show(new TodoList.Views.ListView({
				collection: todoList
			}));
		},

		showTodoList: function() {
			App.main.show(new TodoList.Views.ListView({
				collection: todoList
			}));
		},

		toggleFooter: function() {
			App.footer.$el.toggle(this.todoList.length);
		},

		//set the filter to show complete or all items
		filterItems: function(filter) {
			App.vent.trigger('todoList:filter', filter.trim() || '');
		}
	});

	// TodoList Initializer
	// --------------------
	//
	// Get the TodoList up and running by initializing the mediator
	// when the the application is started, pulling in all of the
	// existing Todo items and displaying them.

	TodoList.addIntitializer(function() {
		var controller = new TodoList.Controller();
		new TodoList.Router({
			controller: controller
		});

		controller.start();
	})			


});