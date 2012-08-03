function catalogPage_pagebeforecreate() {
var catalogName = decodeSpacesIn( getUrlVars()["name"] );
var defaultTag = decodeSpacesIn( getUrlVars()["defaultTag"] );


   window.CatalogItem = Backbone.Model.extend({
   // Default attributes for a todo item.

    defaults: function() {
      return {
        added: false
      };
    },

    toggle: function() {
      this.set({added: !this.get("added")});
    }

 
});



window.CatalogItemList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: CatalogItem,

    catalogName: function() { return catalogName; },
   
    updateAdded: function(catalogItems, items) {
        var itemNames = _.pluck(items.toJSON(), 'name');
        _.each(catalogItems, function(ci) { ci.added = _.include(itemNames, ci.name)  } );
        return catalogItems;
    }, 
    initialize: function() {

      var catalogItems = getCatalogData(this.catalogName());
      var updatedCatalogItems = this.updateAdded(catalogItems, Items);

      this.reset(updatedCatalogItems);

    },
      comparator: function(item) {
                return item.get('name');
               }
    // Save all of the todo items under the `"items"` namespace.
//    localStorage: new Store("catalogitems"),
});

 // Create our global collection of **Items**.
window.CatalogItems = new CatalogItemList;




window.CatalogItemView = Backbone.View.extend({
    tagName:  "li",
    events: {
      "click .addItemFromCatalog"          : "addItemFromCatalog"
    },
    initialize: function() {
            //this.model.bind('change', this.render, this);
            //this.model.bind('destroy', this.remove, this);            
        	this.template = _.template($('#catalogTemplate').html());
		    },
    	render: function() {
			var rendered = $(this.el).html(this.template(this.model.toJSON()));
            $('#catalogListView').append(rendered);
			return this;
		},
        addItemFromCatalog: function() {
                   
                    this.model.get('added') ? this.removeItemFromCatalog() : this.addSelectedItemFromCatalog();
                    //this.model.toggle();
                },
        removeItemFromCatalog: function() {
                                   var selectedCatalogItemName = this.model.get('name');
                                   var itemId = Items.get((_.find(Items.toJSON(), function(item) { return item.name == selectedCatalogItemName; } ))).id
                                   var itemToDelete = Items.get(itemId);
                                   itemToDelete.destroy();
                                   this.model.toggle();
                                   this.$('.ui-icon-minus').removeClass('ui-icon-minus').addClass('ui-icon-plus');
                                
                               },
        addSelectedItemFromCatalog: function() {
                                        var name = this.model.get('name');
                                        var desc = this.model.get('description');
                                        var tags = [defaultTag];
                                        Items.create({name: name, description: desc, tags: tags});
                                        this.$('.ui-icon-plus').removeClass('ui-icon-plus').addClass('ui-icon-minus');
                                        this.model.toggle();

                                    }

					    
	});
 

window.CatalogAppView = Backbone.View.extend({
    el: $("#catalogPage"),


    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.


    initialize: function() {
      //Items.bind('add',   this.addAll, this);
      Items.bind('reset', this.addAll, this);
      CatalogItems.bind('reset', this.addAll, this);

      Items.fetch();
      

      
    },


    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(catalogItem) {
      var view = new CatalogItemView({model: catalogItem});
      this.$("#catalogListView").append(view.render().el);
    },

    // Add all items in the **Items** collection at once.
    addAll: function() {
      $("#catalogListView").children().filter(":not(#catalogListViewDivider)").remove();       
      var listDividerText = catalogName + ' (items will be tagged with ' + defaultTag + ')';
      $('#catalogListViewDivider').text(listDividerText);
      CatalogItems.each(this.addOne);
      
    }
});
}
