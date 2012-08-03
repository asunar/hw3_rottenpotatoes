function allItemsPage_pagebeforecreate() {


   window.Item = Backbone.Model.extend({
   // Default attributes for a todo item.

    defaults: function() {
      return {
        order: Items.nextOrder()
      };
    }
});



window.ItemList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Item,

    // Save all of the todo items under the `"items"` namespace.
    localStorage: new Store("items"),


    getTagCount: function() { return this.getTagCountFor(this.getDefaultTags()); },

    getAllTagsCount: function() { return this.getTagCountFor(this.getAllTags()); },

    getTagCountFor: function(tagNames) {
        var items = this;
        var tagCounts = [];
        _.each(tagNames, function(tagName) {
           var taggedItems = items.filter(function(model) { return _.include((model.get('tags')), tagName) });
           var taggedItemsJoined = (_.map(taggedItems, function(item) { return item.get('name') + ' - ' + item.get('description'); }).join('%0A'));
           var count = taggedItems.length;
           var detailUrl = count == 0 ? 'javascript: void(0)' : 'allItems.html?tag=' + tagName;
           var mailTo = count == 0 ? 'javascript: void(0)' : 'mailto:?subject=Items tagged with ' + tagName +'&body='+ taggedItemsJoined;
           var sms = count == 0 ? 'javascript:void(0)' : 'sms:?body=' + taggedItemsJoined;
           tagCounts.push({tagName: tagName, tagCount: count, url: detailUrl, mailTo: mailTo, sms: sms});
            
        });
        return tagCounts;                    
                    },

    getDefaultTags: function() {
         return ['Buy', 'Borrow', 'Donate', 'Return'];
    }
    ,
    getAllTags: function() {
         //return _.unique(_.flatten(this.pluck('tags')));
        var defaultTags = this.getDefaultTags();
        var tagsInUse = _.unique(_.flatten(this.pluck('tags')));
        return _.union(defaultTags, tagsInUse);
    },


    // We keep the Items in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(item) {
      return item.get('order');
    }

});

 // Create our global collection of **Items**.
window.Items = new ItemList;




window.ItemView = Backbone.View.extend({
    tagName:  "li",
    events: {
      "click .deleteItemLink"          : "deleteItem"
    },
    initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);            
        	this.template = _.template($('#allItemsTemplate').html());
            //console.log('Initialized ItemView');
		    },
	render: function() {
			var rendered = $(this.el).html(this.template(this.model.toJSON()));
            $('#itemsListView').append(rendered);
			return this;
		},

    deleteItem: function() {
                    if(confirm('Are you sure?'))
                    {
                        this.model.destroy();
                        $('#itemsListView').listview("refresh"); 
                    }
                },    
   // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }
	


	});
 

window.AppView = Backbone.View.extend({
    el: $("#allItemsPage"),


    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting items that might be saved in *localStorage*.
    initialize: function() {
      Items.bind('add',   this.addOne, this);
      Items.bind('reset', this.addAll, this);

      Items.fetch();
    },


    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    selectedTagName: function() { return getUrlVars()["tag"];},
    addOne: function(todo) {
      var view = new ItemView({model: todo});
      this.$("#itemsListView").append(view.render().el);
      //$('#itemsListView').listview("refresh"); 
    },

    // Add all items in the **Items** collection at once.
    addAll: function() {
      $("#itemsListView").children().filter(":not(#itemsListViewDivider)").remove();       
      var tagName = this.selectedTagName();
       
      if(tagName == undefined) {
        Items.each(this.addOne);
      }
      else {
        var filteredItems = Items.filter(function(item) { return _.include(item.toJSON().tags, tagName); });
        var addOne = this.addOne;
        _.each(filteredItems, function(item) { addOne(item); });
      }

    }
});
}
