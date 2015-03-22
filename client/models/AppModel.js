// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('allData', params.data);
    this.set('filteredData', params.data);
  }

});
