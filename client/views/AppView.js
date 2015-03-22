// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  className: 'app-view',

  initialize: function(params){
    // console.log('AppView params: ', params);

    this.activityView = new ActivityView({data: this.model.get('filteredData')});
    this.devicesView = new DevicesView({data: this.model.get('filteredData')});
    console.log('segments data from AppView: ', this.model.get('segmentData'));
    this.segmentsView = new SegmentsView({model: this.model, data: this.model.get('segmentData')});

    this.model.on('change:filteredData', function(model) {
      this.activityView.updateData(model.get('filteredData'));
      this.devicesView.updateData(model.get('filteredData'));
    }, this);

    this.model.on('change:segmentData', function(model) {
      this.segmentsView.updateData(model.get('segmentData'));
    }, this);
  },
  render: function(){
    return this.$el.html([
      this.segmentsView.$el
    ]);
  }

});
