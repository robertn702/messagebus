var SegmentsView = Backbone.View.extend({
  template: _.template('<h2>SegmentsView</h2>'),
  className: 'segments-view',
  initialize: function(params) {

  },
  render: function() {
    return this.$el.html(this.template({}));
  }
})