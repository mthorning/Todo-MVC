TodoMVC.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {

	//Layout Header View
	//-----------------

	Layout.Header = Backbone.Marionette.ItemView.extend({
		template: '#template-header',

		//UI bindings create cached attributes that 
		//point ot jquery selected objects
		ui: {
			input: '#new-todo'
		},

		events: {
			'keypress #new-todo': 'onInputKeypress',
			'blur #new-todo': 'onTodoBlur'
		},

		onTodoBlur: function() {
			var todoText = this.ui.input.val().trim();
			this.createTodo(todoText);
		},

		onInputKeypress: function(e) {
			var ENTER_KEY = 13;
			var todoText = this.ui.input.cal().trim();

			if(e.which === ENTER_KEY && todoText) {
				this.createTodo(todoText);
			}
		},

		completeAdd: function() {
			this.ui.input.val('');
		},

		createTodo: function(todoText) {
			if(todoText.trim() === "") { return; }

			this.collection.create({
				title: todoText
			});

			this.completeAdd();
		}
	})

	//Layout Footer View
	//------------------

	Layout.Footer = Marionette.Layout.extend({
		template: '#template-footer',

		ui: {
			todoCount: '#todo-count .count',
			todoCountLabel: '#todo-count .label',
			clearCount: '#clear-completed .count',
			filters: '#filters a'
		},

		events: {
			'click #clear-completed': onClearClick
		},

		initialize: function() {
			this.bindTo(App.vent, 'todoList: filter', this.updateFilterSelection, this);
			this.bindTo(this.collection, 'all', this.updateCount, this);
		},

		onRender: function() {
			this.updatCount();
		},

		updateCount: function() {
			var activeCount = this.collection.getActive().length,
			completedCount = this.collection.getCompleted().length;
			this.ui.todoCount.html(activeCount);

			this.ui.todoCountLabel.html(activeCount === 1 ? 'label' : 'labels');
			this.ui.clearCount.html(compltetedCount === 0 ? '' : '(' + completedCount + ')');
		},

		updatFilterSelection: function(filter) {
			this.ui.filters
				.removeClass('selected')
				.filter('[href="#' + filter + '"]')
				.addClass('selected');
		},

		onClearClick: function() {
			var completed = this.collection.getCompleted();
			completed.forEach(function destroy(todo) {
				todo.destroy();
			});
		}
	});
});