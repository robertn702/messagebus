var SegmentsView = Backbone.View.extend({
  template: _.template('<h2>SegmentsView</h2>'),
  className: 'segments-view',
  initialize: function(params) {
    // formatData(params.data);
  },
  formatData: function(data) {
    // var genderGroupedData = _.countBy(params.data, 'Gender');
    // for (key in genderGroupedData) {

    // }
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function() {
    return this.$el.html(this.template({}));
  }
})
