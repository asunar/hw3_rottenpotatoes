function selectItemPage_pagebeforecreate() {
   window.Catalog = Backbone.Model.extend({ });



   window.CatalogList = Backbone.Collection.extend({
   
        model: Catalog,
        comparator: function(catalog) { return catalog.get('name'); },
        initialize: function() {
            var catalogs = getCatalogNames();
            this.reset(catalogs);

    },
    
   });

  window.Catalogs = new CatalogList; 

  window.CatalogView = Backbone.View.extend({
    tagName:  "li",
    initialize: function() {
            this.template = _.template($('#selectItemTemplate').html());
		    },
	render: function() {
			var rendered = $(this.el).html(this.template(this.model.toJSON()));
            $('#selectItemListview').append(rendered);
			return this;
		}      
  });
   
  window.SelectItemView =  Backbone.View.extend({
    el: $("#selectItemPage"),


    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.
    initialize: function() {
        Catalogs.bind('reset', this.addAll, this);        

      Catalogs.initialize();
    },


    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(catalog) {
      var view = new CatalogView({model: catalog});
      this.$("#selectItemListview").append(view.render().el);
      //$('#itemsListView').listview("refresh"); 
    },

    // Add all items in the **Items** collection at once.
    addAll: function() {
      $("#selectItemListview").children().filter(":not(#selectItemListviewDivider)").remove();    
      Catalogs.each(this.addOne);
    }
});




}


