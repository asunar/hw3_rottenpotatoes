function allTagsPage_pagebeforecreate() {


window.AllTagNameItemCountView = TagNameItemCountView.extend({
	render: function() {
			var rendered = $(this.el).html(this.template(this.model));
            $('#allTagsListview').append(rendered);
			return this;
		}	    
});


window.AllTagsView = Backbone.View.extend({
    el: $("#allTagsPage"),

    initialize: function() {
      Items.bind('add',   this.addAll, this);
      Items.bind('reset', this.addAll, this);
      Items.fetch();
    },

    addOne: function(tagNameItemCount) {
      var view = new AllTagNameItemCountView({model: tagNameItemCount});
      this.$("#allTagsListview").append(view.render().el);
    },


    addAll: function() {
      $("#allTagsListview").children().filter(":not(#listdiv1)").remove();       

      var allTagsView = this;
      var tagNameItemCounts = Items.getAllTagsCount();

      _.each(tagNameItemCounts, function(item) {allTagsView.addOne(item);});

    }
});    


  
 
     
    
}
