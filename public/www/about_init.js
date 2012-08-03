function aboutPage_pagebeforecreate() {

window.TagNameItemCountView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        	this.template = _.template($('#listTemplate').html());
		    },
	render: function() {
			var rendered = $(this.el).html(this.template(this.model));
            $('#listview').append(rendered);
			return this;
		}			   

	});



    
allItemsPage_pagebeforecreate();


window.HomeView = Backbone.View.extend({
    el: $("#aboutPage"),

    initialize: function() {
      Items.bind('add',   this.addAll, this);
      Items.bind('reset', this.addAll, this);
      Items.fetch();
    },

    addOne: function(tagNameItemCount) {
      var view = new TagNameItemCountView({model: tagNameItemCount});
      this.$("#listview").append(view.render().el);
    },


    addAll: function() {
      this.$("#listview").children().filter(":not(#listdiv)").remove();       

      var homeView = this;
      var tagNameItemCounts = Items.getTagCount();

      _.each(tagNameItemCounts, function(item) {homeView.addOne(item);});

    }
});    


  
 
     
    
}
