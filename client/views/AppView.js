// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  className: 'app-view',

  initialize: function(params){
    // console.log('AppView params: ', params);
    console.log('AppView this: ', this);

    this.activityView = new ActivityView({data: this.model.get('filteredData')});
    this.segmentsView = new SegmentsView({data: this.model.get('filteredData')});
    this.devicesView = new DevicesView({data: this.model.get('filteredData')});

    console.log('AppView this after view creation', this);

    this.model.on('change:filteredData', function(model) {
      this.activityView.updateData(model.get('filteredData'));
      this.segmentsView.updateData(model.get('filteredData'));
      this.devicesView.updateData(model.get('filteredData'));
    }, this);
  },
  render: function(){
    return this.$el.html([
      this.segmentsView.$el
    ]);
  }

});
