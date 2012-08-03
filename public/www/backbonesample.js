$( document ).delegate("#aboutPage", "pagebeforecreate", aboutPage_pagebeforecreate);
//$( document ).delegate("#addItemPage", "pagebeforecreate", addItemPage_pagebeforecreate);
//$( document ).delegate("#allItemsPage", "pagebeforecreate", allItemsPage_pagebeforecreate);

$( document ).delegate('#aboutPage', 'pageshow', function (event, ui) {

window.LandingPage = new HomeView; 

  $('#listview').listview("refresh");

});

$( document ).delegate('#allItemsPage', 'pageshow', function (event, ui) {

     window.App = new AppView;
  

  $('#itemsListView').listview('refresh');

});


$( document ).delegate('#addItemPage', 'pageshow', function (event, ui) {

addItemPage_pagebeforecreate();    
  window.AddItem = new AddItemView; 

    $('#addItemPage').page('destroy').page();
});


$( document ).delegate('#allTagsPage', 'pageshow', function (event, ui) {

  allTagsPage_pagebeforecreate();
  window.AllTagsView = new AllTagsView; 
  $('#allTagsListview').listview('refresh');
})


$( document ).delegate('#catalogPage', 'pageshow', function (event, ui) {

  catalogPage_pagebeforecreate();
  window.CatalogAppView = new CatalogAppView; 
  $('#catalogListView').listview('refresh');
})


$( document ).delegate('#selectItemPage', 'pageshow', function (event, ui) {

    selectItemPage_pagebeforecreate(); 
    window.SelectItem = new SelectItemView;
  

  $('#selectItemListview').listview('refresh');

});

//});

