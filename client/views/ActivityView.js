var ActivityView = Backbone.View.extend({
  template: _.template('<h2>ActivityView</h2>'),
  className: 'activity-view',

  render: function() {
    return this.$el.html(this.template({}));
  }
})
