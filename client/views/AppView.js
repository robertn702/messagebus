// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  className: 'app-view',

  initialize: function(params){
    console.log('AppView params: ', params);
    console.log('AppView this: ', this);

    this.activityView = new ActivityView({data: this.model.get('filteredData')});
    this.segmentsView = new SegmentsView({data: this.model.get('filteredData')});
    this.devicesView = new DevicesView({data: this.model.get('filteredData')});

    this.model.on('change:filteredData', function(model) {
      this.activityView.updateData(this.model.get('filteredData'));
      this.segmentsView.updateData(this.model.get('filteredData'));
      this.devicesView.updateData(this.model.get('filteredData'));
    })
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    // this.model.on('change:currentSong', function(model){
    //   this.playerView.setSong(model.get('currentSong'));
    // }, this);
  },

  render: function(){}

});
