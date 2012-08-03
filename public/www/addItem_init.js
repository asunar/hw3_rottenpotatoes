function addItemPage_pagebeforecreate() {
var itemId = getUrlVars()["itemId"];
var item = itemId == undefined ? new Item : Items.get(itemId);

window.AddEditItemView = Backbone.View.extend({
    initialize: function() {
        this.template = _.template($('#addEditItemTemplate').html());
    },

    render: function() {
                var renderedContent = this.template(this.model.toJSON());
			    $(this.el).html(renderedContent);
			    return this;
            }   

});








window.Tags = Backbone.Model.extend({});
window.TagListView = Backbone.View.extend({
    initialize: function() {
        	this.template = _.template($('#tagListItemTemplate').html());
		    },
	render: function() {
            //var thisModel = this.model;
            var renderedContent = this.template(this.model.toJSON());
			$(this.el).html(renderedContent);
			return this;

		}
});



window.AddItemView = Backbone.View.extend({
    el: $("#addItemPageContent"),
    events: {
      "click #btnSaveItem":    "createOnClick"
    },

    initialize: function() {
      Items.bind('add',   this.addAll, this);
      Items.bind('reset', this.addAll, this);
      Items.fetch();
    },    

 
    createOnClick: function() {
                    var name = $("#itemName");
                    var desc = $("#description");
                    var selectedTags = this.getSelectedTags(); 
                    if(name.val() == '') return;

                    if(item.isNew())
                        Items.create({name: name.val(), description: desc.val(), tags:selectedTags});
                    else {
                        item.collection = Items;
                        item.save({name: name.val(), description: desc.val(), tags:selectedTags});
                    }

                    this.clearControls();
                   },

    clearControls: function() {
                    $('#addItemPage :input').val("");
                   },

    getSelectedTags: function() {
                         var selectedTags = [];
                         $('#tagList input:checked').each(function() { selectedTags.push(this.name)});
                         var customTags = this.getCustomTags();

                         var allTags = _.union(selectedTags, customTags);
                         return allTags;
                     },
    getCustomTags: function() {
                       var customTagsString = escape($('#customTags').val());
                       if($.trim(customTagsString) == '') return [];                       
                       var customTags = [];
                       
                       customTags = customTagsString.split(",");
                       return customTags;
                   }
    ,

    addOne: function(tag) {
      var view = new TagListView(
              
              {
                  model: JSON.parse('{"tagName":"' + tag + '"}')
                }
            );
      this.$("#tagList").append(view.render().el);
    },


    addAll: function() {
    
     var addEditItemView = new AddEditItemView({model: item });
     this.el.append(addEditItemView.render().el);


      $("#tagList").children().filter(":not(#listdiv)").remove();       

      var addItemView = this;
      var tagNames = Items.getAllTags();

      var tagNameChecked = _.map(tagNames, function(tagName) {return {tag: tagName , checked: _.include(item.get('tags'), tagName)} });

      var allTagsList = new Tags({tags: tagNameChecked});
      var allTagsListView = new TagListView({model: allTagsList});
      $('#tagList').append(allTagsListView.render().el);
   }    



});    
    
    
}
