
var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#todoapp',

	statsTemplate: _.template($('#stats_template').html()),

	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
	},

	addOne: function(todo) {
		var view = new app.TodoView({ model: todo });
		$('#todolist').append(view.render().el);
	},

	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}

});