// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  className: 'app-view',

  initialize: function(params){
    this.activityView = new ActivityView({model: this.model});
    this.activityChartView = new ActivityChartView({data: this.model.get('filteredData')});
    this.devicesView = new DevicesView({data: this.model.get('filteredData')});
    this.segmentsView = new SegmentsView({model: this.model, data: this.model.get('segmentData')});

    this.model.on('change:filteredData', function(model) {
      this.activityChartView.updateData(model.get('filteredData'));
      this.devicesView.updateData(model.get('filteredData'));
    }, this);

    this.model.on('change:segmentData', function(model) {
      this.segmentsView.updateData(model.get('segmentData'));
    }, this);
  },
  render: function(){
    $('#segments').append(this.segmentsView.$el);
    $('#activity').append(this.activityChartView.$el);
  }

});
